import { extractJiraIssueKey } from "../helpers/filter";
import { Team } from "../../teams/team";
import { SlackEvent } from "../../slack/interfaces";
import { JiraIssue } from "../../jira/interface";
import { formatIssueMessage } from "../formatter/issue";
import { SlackApiClient } from "../api/client";

export class Message {

    public static get type() {
       return "message";
    }

    public static async handle(team: Team, event: SlackEvent, apiClient: SlackApiClient) {
        if (this.isEditedMessage(event)) return null;

        let keys = extractJiraIssueKey(event.text);
        if (!keys) return;

        let tickets = await this.tickets(team, keys);
        if (tickets.length <= 0) return;

        this.send(event.channel, tickets, apiClient);
    }

    private static async send(channel: string, tickets: Array<JiraIssue>, apiClient: SlackApiClient) {
        let message = formatIssueMessage(tickets);
        message.channel = channel;

        apiClient.post("chat.postMessage", message);
    }

    private static async tickets (team: Team, keys: Array<string>) {
        let tickets = Array<JiraIssue>();

        for (let jiraKey of keys) {
            let ticket = await team.jira.findIssue(jiraKey);
            if (!ticket)
                continue;
            tickets.push(ticket);
        }

        return tickets;
    }

    private static isEditedMessage(event: SlackEvent): boolean {
        return !!event.previous_message;
    }

}

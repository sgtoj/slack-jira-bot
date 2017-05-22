import { extractJiraIssueKey } from "../helpers/filter";
import { SlackEvent } from "../../slack/interfaces";
import { JiraIssue } from "../../jira/interface";
import { formatIssueMessage } from "../formatter/issue";
import { SlackBot } from "../bot";
import jira from "../../jira/client";

export class Message {

    public static get type() {
       return "message";
    }

    public static async handle(bot: SlackBot, event: SlackEvent) {
        if (event.previous_message) return null;

        let jiraKeys = extractJiraIssueKey(event.text);
        if (!jiraKeys) return null;

        let tickets = await this.tickets(jiraKeys);
        if (tickets.length <= 0) return null;

        let message = formatIssueMessage(tickets);
        message.token = bot.token;
        message.channel = event.channel;

        bot.client.post("chat.postMessage", message.stringify());
    }

    private static async tickets (jiraKeys: Array<string>) {
        let tickets = Array<JiraIssue>();

        for (let jiraKey of jiraKeys) {
            let ticket = await jira.findIssue(jiraKey);
            if (!ticket)
                continue;
            tickets.push(ticket);
        }

        return tickets;
    }

}

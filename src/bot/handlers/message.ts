import { extractJiraIssueKey } from "../helpers/filter";
import { SlackEvent } from "../../slack/interfaces";
import { jira } from "../../jira/client";

interface JiraIssue {
    id: number;
    self: string;
    key: string;
    summary: string;
    status: {
        self: string;
        description: string;
        iconUrl: string;
        name: string;
        id: string;
        statusCategory: string;
    };
    priority: {
        self: string;
        iconUrl: string;
        name: string;
        id: string;
    };
    assignee: {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: {}
        displayName: string;
        active: boolean;
        timeZone: string;
    };
    creator: {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: {}
        displayName: string;
        active: boolean;
        timeZone: string;
    };
    reporter: {
        self: string;
        name: string;
        key: string;
        emailAddress: string;
        avatarUrls: {}
        displayName: string;
        active: boolean;
        timeZone: string;
    };
    progress: {
        progress: number;
        total: number;
        percent: number;
    };
    issuetype: {
        self: string
        id: string;
        description: string;
        iconUrl: string;
        name: string;
        subtask: string;
        avatarId: number;
    };
    project: {
        self: string;
        id: string;
        key: string;
        name: string;
        avatarUrls: {}
        projectCategory: [{}];
    }
}


export class Message {

    public static get type() {
       return "message";
    }

    public static async handle(event: SlackEvent) {
        let jiraNumber = extractJiraIssueKey(event.text);

        if (jiraNumber) {
            let ticket = await jira.findIssue(jiraNumber[0]);
            console.log(ticket);
        } else {
            console.log(`No Jira ticket`);
        }

    }

}

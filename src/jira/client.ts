import * as JiraClient from "jira-client";

export class Jira {
    private client: any;

    constructor () {
    }

    public configure(config) {
        this.client = new JiraClient(config);
    }

    public async findIssue (issueNumber: string) {
        let issue: any;

        try {
            issue = await this.client.findIssue(issueNumber);
        } catch (e) {
            console.error(e);
        }

        return issue;
    }
}

export const jira = new Jira();
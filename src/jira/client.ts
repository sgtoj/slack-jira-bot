import * as logger from "winston";

import * as JiraClient from "jira-client";
import { JiraIssue } from "./interface";


export interface JiraConfig {
    [name: string]: any;
    protocol: string;
    host: string;
    username: string;
    password: string;
    apiVersion: string;
    strictSSL: boolean;
}


export class Jira {
    private readonly config: JiraConfig;
    private readonly client: any;

    constructor (config: JiraConfig) {
        this.config = config;
        this.client = new JiraClient(config);
    }

    public async findIssue (issueNumber: string): Promise<JiraIssue|undefined> {
        let issue: any;

        try {
            issue = await this.client.findIssue(issueNumber);
            issue.url = `${this.config.protocol}://${this.config.host}/browse/${issue.key}`;
            issue.host = this.config.host;
        } catch (e) {
            logger.error(e);
        }

        return issue;
    }
}
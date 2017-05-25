export interface JiraModel {
    [name: string]: any;
    protocol: string;
    host: string;
    username: string;
    password: string;
    apiVersion: string;
    strictSSL: boolean;
}

export interface TeamModel {
    teamId: string;
    jira: JiraModel;
}

interface JiraUser {
    self: string;
    name: string;
    key: string;
    emailAddress: string;
    avatarUrls: {};
    displayName: string;
    active: boolean;
    timeZone: string;
}

interface JiraStatus {
    self: string;
    description: string;
    iconUrl: string;
    name: string;
    id: string;
    statusCategory: string;
}

interface JiraPriority {
    self: string;
    iconUrl: string;
    name: string;
    id: string;
}

interface JiraProgress {
    progress: number;
    total: number;
    percent: number;
}

interface JiraIssueType {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: string;
    subtask: string;
    avatarId: number;
}

interface JiraProject {
    self: string;
    id: string;
    key: string;
    name: string;
    avatarUrls: {};
    projectCategory: [{}];
}

interface JiraIssueFields {
    summary: string;
    status: JiraStatus;
    priority: JiraPriority;
    assignee: JiraUser;
    creator: JiraUser;
    reporter: JiraUser;
    progress: JiraProgress;
    issuetype: JiraIssueType;
    project: JiraProject;
}

export interface JiraIssue {
    [name: string]: any;
    id: number;
    self: string;
    key: string;
    fields: JiraIssueFields;
    url: string;
    host: string;
}

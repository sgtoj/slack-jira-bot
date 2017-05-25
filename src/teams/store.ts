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

interface InternalStore {
    [teamId: string]: TeamModel;
}

export class TeamStore {
    private readonly store: InternalStore;

    constructor() {
        this.store = {};
    }

    public add(teamModel: TeamModel) {
        this.store["master"] = teamModel;
    }

    public find(teamId: string): TeamModel {
        return this.store["master"];
    }
}
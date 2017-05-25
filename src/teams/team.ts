import { Jira } from "../jira/client";
import { TeamModel } from "./interfaces";

export class Team {
    private readonly model: TeamModel;
    private readonly jiraClient: Jira;

    constructor(model: TeamModel) {
        this.model = model;
        this.jiraClient = new Jira(model.jira);
    }

    public get teamId(): string {
        return this.model.teamId;
    }

    public get jira(): Jira {
        return this.jiraClient;
    }
}
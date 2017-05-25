import * as http from "http";

import { SlackEvent, SlackEventMetaData } from "../slack/interfaces";
import slackEventHandlers from "./handlers/handlers";
import { SlackApiClient, SlackApiClientConfig } from "./api/client";

export interface SlackBotConfig {
    authToken: string;
    validationToken: string;
}

export class SlackBot {
    private readonly apiClient: SlackApiClient;
    private config: SlackBotConfig;

    constructor(config: SlackBotConfig) {
        this.config = config;
        this.apiClient = new SlackApiClient({ authToken: this.authToken });
    }

    public get authToken() {
        return this.config.authToken;
    }

    public get validationToken() {
        return this.config.validationToken;
    }

    public receive(payload: SlackEventMetaData) {
        if (!this.validate(payload))
            return;

        this.process(null, payload.event);
    }

    private process(team: any, event: SlackEvent) {
        const callback = slackEventHandlers.find(cb => {
            return cb.type === event.type;
        });

        if (callback) {
            callback.handle(this.apiClient, event);
        } else {
            console.log(event);
        }
    }

    private validate(payload: SlackEventMetaData): boolean {
        let failCount = 0;

        if (payload.token !== this.validationToken) {
            failCount++;
            console.error(`Event Token Mismatch: ${payload.token}`);
        }

        return failCount === 0;
    }
}
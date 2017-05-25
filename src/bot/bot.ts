import * as http from "http";

import { SlackEvent, SlackEventMetaData } from "../slack/interfaces";
import slackEventHandlers from "./handlers/handlers";
import { SlackApiClient } from "./api/client";
import client from "./api/client";


export class SlackBot {
    private _authToken: string;
    private _validationToken: string;
    private _client: SlackApiClient;

    constructor() {
        this._client = client;
    }

    public get client() {
        return this._client;
    }

    public get authToken() {
        return this._authToken;
    }

    public get validationToken() {
        return this._validationToken;
    }

    public configure(config) {
        this._authToken = config.token;
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
            callback.handle(bot, event);
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

const bot = new SlackBot();
export default bot;
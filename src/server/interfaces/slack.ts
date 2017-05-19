import { Request } from "express";

export interface SlackCallbackRequest extends Request {
    body: SlackEventMetaData;
}

export interface SlackEvent {
    type: string;
    user: string;
    text: string;
    ts: string;
    channel: string;
    event_ts: string;
}

export interface SlackEventMetaData {
    type: "event_callback";
    token: string;
    team_id: string;
    api_app_id: string;
    event: SlackEvent;
    authed_users: Array<string>;
    event_id: string;
    event_time: number;
}

export interface SlackEventUrlVerification {
    type: "url_verification";
    challenge: string;
}
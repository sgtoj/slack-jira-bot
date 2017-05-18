export interface SlackEvent {
    type: string;
    user: string;
    text: string;
    ts: string;
    channel: string;
    event_ts: string;
}

export interface SlackEventPayload {
    token: string;
    team_id: string;
    api_app_id: string;
    event: SlackEvent;
    type: string;
    authed_users: Array<string>;
    event_id: string;
    event_time: number;
}
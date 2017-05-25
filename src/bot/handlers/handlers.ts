import { SlackEvent } from "../../slack/interfaces";
import { TeamModel } from "../../teams/store";
import { SlackApiClient } from "../api/client";

import { Message } from "./message";

export interface Handler {
    type: string;
    handle(team: TeamModel, event: SlackEvent, apiClient: SlackApiClient): void;
}

const handlers: Array<Handler> = [
    Message
];

export default handlers;
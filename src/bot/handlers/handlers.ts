import { SlackEvent } from "../../slack/interfaces";
import { SlackApiClient } from "../api/client";
import { Message } from "./message";

export interface Handler {
    type: string;
    handle(apiClient: SlackApiClient, event: SlackEvent): void;
}

const handlers: Array<Handler> = [
    Message
];

export default handlers;
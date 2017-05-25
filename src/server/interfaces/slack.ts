import { Request } from "express";
import { SlackEventMetaData } from "../../slack/interfaces";
import { AppLocal } from "./app-local";

export interface HandlerApiRequest extends Request {
    locals: AppLocal;
}

export interface SlackCallbackRequest extends HandlerApiRequest {
    body: SlackEventMetaData;
}

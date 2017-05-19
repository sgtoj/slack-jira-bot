import { NextFunction, Response } from "express";
import { SlackCallbackRequest } from "../interfaces/slack";
import { slackCallbacks } from "../callbacks/callbacks";

export class EventCallback {

    public static get type() {
       return "event_callback";
    }

    public static handle(req: SlackCallbackRequest, res: Response, next: NextFunction) {
        let event = req.body.event;

        const callback = slackCallbacks.find(cb => {
            return cb.type === event.type;
        });

        if (callback) {
            callback.handle(req, res, next);
        } else {
            console.log(callback);
        }
    }

}


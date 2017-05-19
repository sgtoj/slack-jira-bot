import { NextFunction, Request, Response } from "express";
import { SlackCallbackRequest } from "../interfaces/slack";

export class Message {

    public static get type() {
       return "message";
    }

    public static handle(req: SlackCallbackRequest, res: Response, next: NextFunction) {
        console.log(`New Message: ${req.body.event.text}`);
        res.end();
    }

}

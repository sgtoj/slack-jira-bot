import { slackEventHandlers } from "./handlers/handlers";
import { SlackEvent } from "../slack/interfaces";

class SlackBot {

    constructor() {

    }

    public handleEvent(event: SlackEvent) {

        const callback = slackEventHandlers.find(cb => {
            return cb.type === event.type;
        });

        if (callback) {
            callback.handle(event);
        } else {
            console.log(callback);
        }
    }

}

export const bot = new SlackBot();
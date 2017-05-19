import { extractJiraIssueKey } from "../helpers/filter";
import { SlackEvent } from "../../slack/interfaces";


export class Message {

    public static get type() {
       return "message";
    }

    public static handle(event: SlackEvent) {
        let jiraNumber = extractJiraIssueKey(event.text);

        if (jiraNumber) {
            console.log(`Jira Number: ${jiraNumber}`);
        } else {
            console.log(`No Jira ticket`);
        }

    }

}

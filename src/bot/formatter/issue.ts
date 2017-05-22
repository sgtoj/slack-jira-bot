import { JiraIssue } from "../../jira/interface";
import { MessagePayload } from "./payloads/message";

const CARD_COLOR = "#205081";

export function formatIssueMessage (issues: Array<JiraIssue>): MessagePayload {
    let message = new MessagePayload();

    for (let issue of issues) {
        let attachment = {
            "title": `${issue.key}: ${issue.fields.summary}`,
            "title_link": issue.url,
            "color": CARD_COLOR,
            "fields": [{
                    "title": "Status",
                    "value": issue.fields.status.name,
                    "short": true
                },
                {
                    "title": "Priority",
                    "value": issue.fields.priority.name,
                    "short": true
                },
                {
                    "title": "Type",
                    "value": issue.fields.issuetype.name,
                    "short": true
                },
                {
                    "title": "Assignee",
                    "value": issue.fields.assignee.displayName,
                    "short": true
                }
            ],
            "footer": issue.host,
            "footer_icon": "http://i.imgur.com/kaif0b3.png",
            "ts": (new Date()).getTime() / 1000
        };

        // TODO: make footer and footer_icon dynamic

        message.attachments.push(attachment);
    }

    return message;

}
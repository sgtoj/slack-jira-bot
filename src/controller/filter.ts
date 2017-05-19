const JIRA_ISSUE_PATTERN = /[a-z]+-[0-9]+/i;

export function extractJiraIssueKey (message: string): Array<string> | null {
    let matches = message.match(JIRA_ISSUE_PATTERN);

    if (!matches)
        return null;

    return matches;
}
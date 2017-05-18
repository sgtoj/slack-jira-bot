import * as chai from "chai";
import * as td from "testdouble";

import { extractJiraIssueKey } from "./filter";

const assert = chai.assert;

describe("Functions", async () => {

    describe("extractJiraIssueKey()", async () => {

        it("should return null", async () => {
            const msg = `Hi Bob!`;

            const keys = extractJiraIssueKey(msg);

            assert.notOk(keys);
        });

        it("should return valid Jira issue key", async () => {
            const jiraKey = "INF-10";
            const msg = `Bob, you send ${jiraKey} yet?`;

            const keys = extractJiraIssueKey(msg);

            assert.ok(keys);
            assert.isArray(keys);
            assert.equal(keys[0], jiraKey);
        });

        it("should return valid Jira issue key", async () => {
            const jiraKey = "INF-10";
            const msg = `Bob, you send ${jiraKey} yet?`;

            const keys = extractJiraIssueKey(msg);

            assert.ok(keys);
            assert.isArray(keys);
            assert.equal(keys[0], jiraKey);
        });

    });

});
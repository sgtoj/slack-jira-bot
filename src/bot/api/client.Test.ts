import * as chai from "chai";
import * as td from "testdouble";

import * as https from "https";
import * as request from "../helpers/request";
import { PostPayload } from "./interface";
import { SlackApiClient, SlackApiClientConfig } from "./client";

const assert = chai.assert;

describe("bot.api.SlackApiClient", async () => {

    describe("post()", async () => {
        let client: SlackApiClient;
        let config: SlackApiClientConfig;
        let payload: PostPayload;
        let postFake: any;
        let helperRequest: any;

        beforeEach(done => {
            payload = { token: "", toBody: () => "" };
            config = { authToken: "123456789" };
            client = new SlackApiClient(config);

            postFake = td.func(request.post);
            td.replace(request, "post", postFake);
            done();
        });

        afterEach(done => {
            td.reset();
            done();
        });

        it("should return results after invoking a Slack API POST request with valid parameters ", async () => {
            const resultFake = {};
            td.when(postFake(td.matchers.anything(), td.matchers.anything())).thenResolve(resultFake);

            const result = await client.post("do.somthing", payload);

            assert.deepEqual(result, resultFake);
        });

    });

});
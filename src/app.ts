import * as http from "http";
import * as express from "express";

import { HandlerAPI, HandlerAPIConfig } from "./server/server";
import { JiraConfig } from "./jira/client";
import jira from "./jira/client";
import { SlackBot, SlackBotConfig } from "./bot/bot";

export interface AppConfig {
    server: HandlerAPIConfig;
    slack: SlackBotConfig;
    jira: JiraConfig;
}

export class SlackApp {
    private readonly config: AppConfig;
    private readonly bot: SlackBot;
    private readonly api: HandlerAPI;
    private readonly server: http.Server;

    constructor (config: AppConfig) {
        this.config = config;

        this.bot = new SlackBot(this.config.slack);
        this.api = new HandlerAPI(config.server, this.bot);
        this.server = http.createServer(this.api.app);

        this.configure();
    }

    public launch () {
        this.server.listen(this.config.server.port);
        this.server.on("error", this.onError.bind(this));
        this.server.on("listening", this.onListening.bind(this));
    }

    private configure () {
        jira.configure(this.config.jira);
    }

    private onError(error) {
        if (error.syscall !== "listen")
            throw error;

        let bind = typeof this.config.server.port === "string"
            ? "Pipe " + this.config.server.port
            : "Port " + this.config.server.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(`${bind} requires elevated privileges!`);
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(`${bind} is already in use!`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening() {
        let addr = this.server.address();
        let bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
        console.info(`Listening on ${bind}`);
    }
}
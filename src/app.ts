import * as http from "http";
import * as express from "express";

import { HandlerServer, HandlerServerConfig } from "./server/server";
import { JiraConfig } from "./jira/client";
import jira from "./jira/client";
import bot from "./bot/bot";

export interface AppConfig {
    server: HandlerServerConfig;
    slack: { token: string; };
    jira: JiraConfig;
}

export class App {
    private appWebhook: express.Application;
    private svrWebhook: http.Server;
    private config: AppConfig;

    constructor (config: AppConfig) {
        this.config = config;

        let webhookHandler = HandlerServer.bootstrap(config.server);
        this.appWebhook = webhookHandler.app;
        this.svrWebhook = http.createServer(this.appWebhook);

        this.configure();
    }

    public launch () {
        this.svrWebhook.listen(this.config.server.port);
        this.svrWebhook.on("error", this.onError.bind(this));
        this.svrWebhook.on("listening", this.onListening.bind(this));
    }

    private configure () {
        jira.configure(this.config.jira);
        bot.configure(this.config.slack);
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
        let addr = this.svrWebhook.address();
        let bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
        console.info(`Listening on ${bind}`);
    }

}
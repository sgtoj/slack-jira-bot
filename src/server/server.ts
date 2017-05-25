import * as express from "express";
import * as bodyParser from "body-parser";

import { SlackBot } from "../bot/bot";
import { AppLocal } from "./interfaces/app-local";
import { IndexRoute } from "./routes/index";

export interface HandlerAPIApp extends express.Application {
    locals: AppLocal;
}

export interface HandlerAPIConfig {
    port?: number;
    basePath?: string;
}

export class HandlerAPI {
    private readonly config: HandlerAPIConfig;
    public readonly application: HandlerAPIApp;

    constructor(config: HandlerAPIConfig, bot: SlackBot) {
        this.config = config;
        this.application = express();

        this.application.locals.bot = bot;
        this.middlewares();
        this.routes();
    }

    public get app() {
        return this.application;
    }

    private middlewares (): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private routes(): void {
        let router = express.Router();

        IndexRoute.create(router);

        if (!!this.config.basePath && this.config.basePath !== "") {
            this.app.use(this.config.basePath, router);
        } else {
            this.app.use(router);
        }
    }
}
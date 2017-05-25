import * as fs from "fs";
import defaults from "./data/defaults";
import { SlackApp, AppConfig } from "./app";

const CONFIG_PATH = process.env.CONFIG_PATH || "./appconfig.json";

let config: AppConfig  = Object.assign({}, defaults.config);

if (fs.existsSync(CONFIG_PATH)) {
    try {
        let contents = fs.readFileSync(CONFIG_PATH, "utf8");
        let override = JSON.parse(contents);
        config = Object.assign(defaults, override);
    } catch (e) {
        console.error(e);
    }
}

config.slack.authToken = process.env.SLACK_TOKEN || config.slack.authToken;
config.server.port = process.env.SERVER_PORT || config.server.port;
config.server.basePath = process.env.SERVER_BASEPATH || config.server.basePath;
config.jira.protocol = process.env.JIRA_PROTOCOL || config.jira.protocol;
config.jira.host = process.env.JIRA_HOST || config.jira.host;
config.jira.username = process.env.JIRA_USERNAME || config.jira.username;
config.jira.password = process.env.JIRA_PASSWORD || config.jira.password;
config.jira.apiVersion = process.env.JIRA_APIVERSION || config.jira.apiVersion;

const app = new SlackApp(config);
app.launch();

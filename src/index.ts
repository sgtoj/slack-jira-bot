import * as fs from "fs";
import * as logger from "winston";
import defaults from "./data/defaults";
import { TeamStore } from "./teams/store";
import { SlackApp, AppConfig } from "./app";

const CONFIG_PATH = process.env.CONFIG_PATH || "./appconfig.json";

let config: AppConfig = Object.assign({}, defaults.config);

if (fs.existsSync(CONFIG_PATH)) {
    try {
        let contents = fs.readFileSync(CONFIG_PATH, "utf8");
        let override = JSON.parse(contents);
        config = Object.assign(defaults, override);
    } catch (e) {
        logger.error(e);
    }
}

config.team.teamId = "main";
config.team.jira.protocol = process.env.JIRA_PROTOCOL || config.team.jira.protocol;
config.team.jira.host = process.env.JIRA_HOST || config.team.jira.host;
config.team.jira.username = process.env.JIRA_USERNAME || config.team.jira.username;
config.team.jira.password = process.env.JIRA_PASSWORD || config.team.jira.password;
config.team.jira.apiVersion = process.env.JIRA_APIVERSION || config.team.jira.apiVersion;

const teams = new TeamStore();
teams.add(config.team);

config.slack.authToken = process.env.SLACK_AUTHTOKEN || config.slack.authToken;
config.slack.validationToken = process.env.SLACK_VALIDATIONTOKEN || config.slack.validationToken;
config.server.port = process.env.SERVER_PORT || config.server.port;
config.server.basePath = process.env.SERVER_BASEPATH || config.server.basePath;

const app = new SlackApp(config, teams);
app.launch();

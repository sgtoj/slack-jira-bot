import { App, AppConfig } from "./app";

const config: AppConfig = require("../data/config.json");

config.app.port = process.env.APP_PORT || config.app.port;
config.slack.token = process.env.SLACK_TOKEN || config.slack.token;
config.jira.protocol = process.env.JIRA_PROTOCOL || config.jira.protocol;
config.jira.host = process.env.JIRA_HOST || config.jira.host;
config.jira.username = process.env.JIRA_USERNAME || config.jira.username;
config.jira.password = process.env.JIRA_PASSWORD || config.jira.password;
config.jira.apiVersion = process.env.JIRA_APIVERSION || config.jira.apiVersion;

const app = new App();
app.configure(config);
app.launch();

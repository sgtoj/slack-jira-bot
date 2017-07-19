# Simple Jira Slack Bot

Slack bot that parse sent messages for embedded Jira issue number and post a
message of said issue.

![](./resources/example.png)

## Instructions

### How To Use

- Complete the **Installation** Instructions
- Add the Bot user to channel, group, or direct message to listen for Jira
  tickets.

### Installation

#### Slack

- Create a new [Slack App](https://api.slack.com/apps)
  - Give it a name and assign it desired team.
- Add **Bot Users**
  - Example: `@jirabot`
- Turn on Event Subscription
  - Can *not* assign **Request URL** yet.
- Subscribe to _Bot_ Events:
  - `message.channels`
  - `message.groups`
  - `message.im`
  - `message.mpim`
- Add Permissions:
  - `chat:write:bot`
- Install App
- Complete the **Application** Instructions
- Add **Request URL** for Event Subscriptions
  - This only has to be done once.

#### Application

- Open Terminal or Command Prompt
- Clone Repository
  - `git clone https://github.com/sgtoj/jira-slack-bot.git`
- Change Directory to Project's Root Directory
  - `cd ./jira-slack-bot/`
- Install NPM Packages
  - `npm install`
- Run Compile
  - `npm run compile`
- Config Settings via Config File or Environment Variables
  - See the respective section below.
- Start App
  - `npm start`

##### Config File

The config file is one way to configure the application.

- Copy `appconfig.template.json` to `appconfig.json`
  - `cp ./appconfig.template.json ./appconfig.json`
  - Git will ignore the `appconfig.json` file.
- Fill in the blank values in the `appconfig.json` file.

##### Environment Variabels

These enviroment variables can be used to override any settings that is
defined by default or defined the in the `appconfig.json` (explained above).

- `SERVER_PORT`: Server port listening for incoming Slack webhook events.
  - Default: 80
- `SERVER_BASEPATH`: Base URL path for incoming slack webhook events.
  - Example: `/coolbot`
- `SLACK_AUTHTOKEN`: Slack **OAuth Access Token** for the app.
  - Example: `xoxp-xxx-xxx-xxx-xxx`
- `SLACK_VALIDATIONTOKEN`: Slack **App Credential Verification Token**.
  - Example: `zxy098`
- `JIRA_PROTOCOL`: HTTP or HTTPS protocol used to connect to Jira.
  - Default: `https`
- `JIRA_HOST`: Domain of Jira.
  - Example: `jira.example.com`
- `JIRA_USERNAME`: Jira username.
  - Example: `a1B2c3`
- `JIRA_PASSWORD`: Jira password.
  - Example: `a1B2c3`
- `JIRA_APIVERSION`: Jira API version.
  - Default: `2`
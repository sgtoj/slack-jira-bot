const defaults = {
    config: {
        "server": {
            "port": 80
        },
        "slack": {
            "authToken": "",
            "validationToken": ""
        },
        "jira": {
            "protocol": "https",
            "host": "",
            "username": "",
            "password": "",
            "apiVersion": "2",
            "strictSSL": true
        }
    }
};

export default defaults;
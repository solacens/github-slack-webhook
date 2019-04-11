# Github > Slack Webhook

> Converting github webhook to simple slack messages

---
## Usage

```sh
yarn # Get dependencies
node main.js # Main script
```

---
## Environment variables

| Name         | Required | Default Value                                        | Description               |
|--------------|----------|------------------------------------------------------|---------------------------|
| EXPRESS_PORT | No       | 8080                                                 | Port that express runs on |
| WEBHOOK_URL  | Yes      | https://hooks.slack.com/services/unknown/destination | Slack webhook URL         |
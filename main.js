'use strict'

const PORT = process.env.EXPRESS_PORT ? process.env.EXPRESS_PORT : 8080
const WEBHOOK_URL = process.env.WEBHOOK_URL ? process.env.WEBHOOK_URL : 'https://hooks.slack.com/services/unknown/destination' // Test workspace
const ACCEPT_BRANCH = ["refs/heads/master"]

const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const convertAndSendImcomingWebhookToSlack = (body) => {
  if (ACCEPT_BRANCH.indexOf(body.ref) !== -1) {
    const text = `*${body.head_commit.committer.name}* has pushed latest commit <${body.head_commit.url}|*${body.head_commit.id.substr(0, 7)}*> to branch *${body.ref.replace('refs/heads/', '')}*. Check it out!`
    axios.post(WEBHOOK_URL, {
      text,
      username: 'Github Pushes',
      mrkdwn: true
    })
      .then(function (res) {
        console.log('Message successfully delivered to Slack.')
      })
      .catch((err) => {
        console.log('Message failed to send to Slack', err)
      })
  }
}

app.use(bodyParser.json())

app.get('/ping', (req, res, next) => {
  res.send('pong')
})

app.post('/webhook', (req, res, next) => {
  console.log('Github webhook received.')
  convertAndSendImcomingWebhookToSlack(req.body)
  res.send('OK')
})

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}!`)
})
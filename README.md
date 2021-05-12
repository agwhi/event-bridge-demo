# event-bridge-demo

## Steps to follow along

- Clone repo
- Run yarn (or npm)
- deploy using the serverless framework
  - `yarn sls deploy --aws-profile {your profile}`
  - If you need to set up your profile you can follow https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
- open sls-dev-tools in your terminal
  - `yarn sls-dev-tools -p {your profile}`
  - if your profile is default you won't need the `-p {your profile}`
- Go to the event bridge page in the aws console using sls-dev-tools
  - use the `tab` button to move to the eventbridge section
  - use the arrows to select the 'event-bridge' bus
  - click `o` to open the AWS console
  - click the `Start discovery`
  - Select the `Archives` tab
  - Use the `Create Archive` button to create a archive
  - Select custom bus again and this time create an archive
- Use sls-dev-tools to invoke the service1 lambda
  - Tab back to the `Lambda functions section`
  - select the lambda in the list using the arrows and click `i`
- Open the logs for service1
  - select the lambda in the list and click enter
  - see the body you sent has been printed
- Open the logs for service2
  - select the lambda in the list and click enter
  - see the body you sent to service1 has been printed
- Select the event-bridge
  - tab to the Event Bridges section
  - click `r` too see the Event registry
  - click enter to see the schema
  - click enter again to see the fields you've been sending in the body of your events
- Send event from sls-dev-tools
  - use the arrows to select the 'event-bridge' bus
  - click `i`
  - Enter details that match below (up to you what you put in Detail)
    - Source: "custom.service2_event"
    - DetailType: "example"
- Go back to event buses page on the AWS console
  - click `o` on the event bus again (if you closed the old tab)
  - open the archives tab and open the archive you created earlier
  - create a new replay using the `new replay` button
- Go to the Schema tab in the AWS console
  - Open the `Discovered schema registry` tab
  - See the schema from before
  - Open it and see the same details you saw in sls-dev-tools
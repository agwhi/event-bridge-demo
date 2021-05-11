# event-bridge-demo

## Steps to follow along

- Clone repo
- Run yarn (or npm)
- deploy using the serverless framework
  - `yarn sls deploy --aws-profile {your profile}`
- Go to the event bridge page in the aws console
  - Go to the Event buses tab
  - Select the custom bus and click actions
  - Select Start discovery
  - Select it again and this time create an archive
- open sls-dev-tools in your terminal
  - `yarn sls-dev-tools -p {your profile}`
- Use sls-dev-tools to invoke the service1 lambda
  - select the lambda in the list using the arrows and click `i`
- Open the logs for service1
  - select the lambda in the list and click enter
  - see the body you sent has been printed
- Open the logs for service2
  - select the lambda in the list and click enter
  - see the body you sent to service1 has been printed
- Select the event-bridge
  - table to the Event Bridges section
  - click `r` too see the Event registry
  - click enter to see the schema
  - click enter again to see the fields you've been sending in the body of your events
- Go back to event buses page on the AWS console
  - select the event bridge
  - open the archives tab and open the archive you created earlier
  - create a new replay using the `new replay` button
- Go to the Schema tab in the AWS console
  - Open the `Discovered schema registry` tab
  - See the schema from before
  - Open it and see the same details you saw in sls-dev-tools
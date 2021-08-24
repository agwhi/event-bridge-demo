// @ts-nocheck
const AWS = require("aws-sdk");
const fs = require("fs");
import { sleep, filename } from "./utils";

import { AWSClient, EventBridge } from "sls-test-tools";

const lambda = new AWSClient.Lambda()
let eventBridge;

jest.setTimeout(50000); // eventual consistency can take time

describe("Integration Testing Event Bridge", () => {
  beforeAll(async () => {
    eventBridge = await EventBridge.build("event-bridge")
  });

  afterAll(async () => {
    await eventBridge.destroy()
  });

  it("emits an event to the correct EventBus when triggered", async () => {
    const event = {
      body: JSON.stringify({
        filename: filename,
      }),
    };

    // Invoke Lambda Function
    const params = {
      FunctionName: "event-bridge-demo-dev-placeOrder",
      Payload: JSON.stringify(event),
    };
    await lambda.invoke(params).promise();

    const eventBridgeEvents = await eventBridge.getEvents()
    expect(eventBridgeEvents).toHaveEvent();
    expect(eventBridgeEvents).toHaveEventWithSource("event-bridge-demo.placeOrder");
  });

  it("writes the correct data to S3 when correct event pushed to EventBridge", async () => {
    // inject event onto the event bus
    await eventBridge
      .publishEvent("event-bridge-demo.placeOrder", "example", JSON.stringify({ filename: filename }));

    await sleep(5000); // wait 5 seconds to allow event to pass

    //Assert S3 bucket exists
    expect('event-bridge-demo-bucket').toExistAsS3Bucket()

    // Assert that file was added to the S3 bucket
    expect({ bucketName: 'event-bridge-demo-bucket', objectName: filename}).toHaveContentTypeEqualTo("application/pdf");

    // Assert that the correct file was added to the S3 bucket
    const content = fs.readFileSync('src/invoice.pdf');
    expect({ bucketName: 'event-bridge-demo-bucket', objectName: filename}).toHaveContentEqualTo(content);
  });
});

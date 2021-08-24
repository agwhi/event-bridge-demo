"use strict";
const AWS = require("aws-sdk");
const fs = require("fs");

module.exports.handler = async (ctx, _) => {
  const s3 = new AWS.S3();
  const filename = "src/invoice.pdf";
  const fileContent = fs.readFileSync(filename);

  const params = {
    Bucket: "event-bridge-demo-bucket",
    Key: ctx.detail.filename,
    Body: fileContent,
    ContentType: "application/pdf",
  };

    // Logging to show the event bridge event triggered the lambda
    console.log(JSON.stringify(ctx.detail))

  try {
    await s3.putObject(params).promise();
  } catch (error) {
    console.error(error);
  }
};

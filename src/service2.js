"use strict";
const AWS = require("aws-sdk");

module.exports.handler = async (event, context, callback) => {
  
  // Logging to show the event bridge event triggered the lambda
  console.log(JSON.stringify(event.detail))
};

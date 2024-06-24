"use strict";
const dotenv = require("dotenv");
dotenv.config();

exports.config = {
  app_name: ["FoodMe-App-V2"],
  license_key: process.env.LICENSE_KEY,
  logging: { level: "info" },
  allow_all_headers: true,
  attributes: {
    exclude: [
      "request.headers.cookie",
      "request.headers.authorization",
      "request.headers.proxyAuthorization",
      "request.headers.setCookie*",
      "request.headers.x*",
      "response.headers.cookie",
      "response.headers.authorization",
      "response.headers.proxyAuthorization",
      "response.headers.setCookie*",
      "response.headers.x*",
    ],
  },
};

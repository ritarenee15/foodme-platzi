"use strict";
exports.config = {
  app_name: ["FoodMe"],
  license_key:
    process.env.LICENSE_KEY || "84cda05dee57b87563f71c39d466aab6879cNRAL",
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

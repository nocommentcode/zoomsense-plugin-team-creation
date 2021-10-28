const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello World!", { structuredData: true });
  response.send("Hello from Firebase!");
});

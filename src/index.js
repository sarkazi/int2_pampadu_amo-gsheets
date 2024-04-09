const express = require("express");

require("dotenv").config();

const expressApp = require("./utils/express-app.js");

let PORT = process.env.PORT || 3481;

(async () => {
  const app = express();

  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`Express server is running on port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    })
    .on("close", () => {
      channel.close();
    });
})();

const express = require("express");

const cors = require("cors");

const AmoRouter = require("../routes/amo.routes.js");

module.exports = async (app) => {
  app.use(cors());
  app.use(express.json({ limit: "50mb", extended: true }));
  app.use(express.urlencoded({ limit: "50mb" }));

  app.use("/amo", AmoRouter);
};

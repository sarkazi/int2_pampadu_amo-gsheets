const express = require("express");

const cors = require("cors");

module.exports = async (app) => {
  app.use(cors());
  app.use(express.json({ limit: "50mb", extended: true }));
  app.use(express.urlencoded({ limit: "50mb" }));

  app.get("/pampadu", (req, res) => {
    try {
      return res.status(200).json({ status: "success" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error" });
    }
  });
};

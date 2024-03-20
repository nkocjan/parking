const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const { mainInformation } = require("../model/models");

connectDB();

// ### MAIN PAGE ### //

router.get("/", async (req, res) => {
  try {
    // ### RENDERING FREE PARKING SPACES ### //

    const mainInfo = await mainInformation.find();
    const pozostaleMiejsca = mainInfo[0].pozostaleMiejsca;
    res.render("index", { wolneMiejsca: pozostaleMiejsca });
  } catch (error) {
    res.send(error);
    console.log("error podczas wczytywania bazy danych w pliku index.js");
  }
});

module.exports = router;

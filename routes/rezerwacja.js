const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const { parkingSpaceReservation } = require("../model/models");

router.post("/", async (req, res, next) => {
  try {
    connectDB();
  } catch {
    console.log("Rezerwacja no connection");
  }

  // Do skończenia dodanie płatności

  await parkingSpaceReservation.updateOne(
    { reservationCode: req.session.reservationCode },
    { $set: { isPaid: "yes" } }
  );
  console.log(req.session.reservationCode);
  res.send("Twoja rezerwacja została opłacona ! ! !");
  next();
});

router.get("/", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;

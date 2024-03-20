const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const { mainInformation, parkingSpaceReservation } = require("../model/models");
const { createDate } = require("../sources/functions");
router.post("/", async (req, res) => {
  try {
    connectDB();

    // ### UPDATING DATA ### //
    const actualDate = new Date();
    let baseDate, arriveBaseDate, isPaid;
    const parkingList = await parkingSpaceReservation.find();
    for (let i = 0; i < parkingList.length; i++) {
      baseDate = createDate(parkingList[i].departuateDate);
      arriveBaseDate = createDate(parkingList[i].arriveDate);
      isPaid = parkingList[i].isPaid;
      if (actualDate < baseDate) {
        console.log("Nie wygaslo");
      } else {
        console.log("Wygasło");
        await parkingSpaceReservation.updateOne(
          {
            _id: parkingList[i]._id,
          },
          {
            $set: {
              actual: "no",
            },
          }
        );
      }
      if (isPaid == "none" && actualDate >= arriveBaseDate) {
        await parkingSpaceReservation.updateOne(
          {
            _id: parkingList[i]._id,
          },
          {
            $set: {
              actual: "no",
            },
          }
        );
        console.log("Nie zostalo oplacone - wygaslo");
      }
    }

    // ### UPDATING FREE SPACES ON PAGE ### //
    const actualList = await parkingSpaceReservation.find({ actual: "yes" });
    let _pozostaleMiejsca = 1000 - actualList.length;
    await mainInformation.updateOne(
      {},
      { $set: { pozostaleMiejsca: _pozostaleMiejsca } }
    );
    res.send("updated");
  } catch (error) {
    res.send("blad aktualizacj");
  }
});

router.get("/", (req, res) => {
  res.sendStatus(404);
});

module.exports = router;

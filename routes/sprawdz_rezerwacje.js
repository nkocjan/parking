const express = require("express");
const router = express.Router();
const { connectDB } = require("../config/db");
const { parkingSpaceReservation, mainInformation } = require("../model/models");

router.get("/", (req, res) => {
  res.render("sprawdz_rezerwacje");
});
router.post("/", async (req, res) => {
  let _numerRezerwacji;
  let _kodRezerwacji;
  let _numerTelefonu;

  if (req.body.numer_rezerwacji) {
    _numerRezerwacji = req.body.numer_rezerwacji;
  }
  if (req.body.numer_telefonu) {
    _numerTelefonu = req.body.numer_telefonu;
  }
  if (req.body.kod_rezerwacji) {
    _kodRezerwacji = req.body.kod_rezerwacji;
  }

  connectDB();

  // ### SEARCHING RESERVATION INFO TO RENDER ### //
  const reservationInfo = await parkingSpaceReservation.find({
    reservationNumber: _numerRezerwacji,
    reservationCode: _kodRezerwacji,
    phoneNumber: _numerTelefonu,
  });
  console.log("Reservetion info sprawdz rezerwacje", reservationInfo);

  // ### RENDERING RESERVATION INFO ### //
  if (!reservationInfo[0]) {
    res.send("Brak takiej rezeracji");
  } else if (reservationInfo[0].actual == "no") {
    res.send("Brak takiej rezeracji");
  } else {
    res.render("sprawdz_rezerwacje", {
      arriveDate: reservationInfo[0].arriveDate,
      departuateDate: reservationInfo[0].departuateDate,
      price: reservationInfo[0].price,
      isPaid: reservationInfo[0].isPaid,
      currency: "PLN",
    });
  }
});

module.exports = router;

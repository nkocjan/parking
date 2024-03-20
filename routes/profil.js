const express = require("express");
const router = express.Router();
const { connectDB } = require("../config/db");
const { parkingSpaceReservation } = require("../model/models");
const session = require("express-session");
router.get("/", (req, res) => {
  console.log("profil get work");
  res.render("profil");
});

router.post("/", async (req, res) => {
  connectDB();

  // ### TAKE DATA FROM BODY ### //

  let reservationCode = req.body.reservationCode;
  let reservationNumber = req.body.reservationNumber;
  let name = req.body.imie;
  let surname = req.body.nazwisko;
  let phoneNumber = req.body.numer;

  // ### CREATING SESSION ### //

  req.session.reservationCode = reservationCode;
  req.session.reservationNumber = reservationNumber;

  // ### SEARCHING USER BY DATA ### //

  const reservationInfo = await parkingSpaceReservation.find({
    reservationCode: reservationCode,
    reservationNumber: reservationNumber,
    phoneNumber: phoneNumber,
    name: name,
    surname: surname,
  });
  console.log(reservationInfo);

  // ### RENDERING PAGE WITH ERROR OR WITH DATA TO PAY ### //

  let newReservationDiv;
  if (!reservationInfo.length) {
    newReservationDiv = `</br></br><div style="text-align: center; color: red;"><b>Podano błędne dane ! ! !</b></div>`;
  } else {
    newReservationDiv = `</br></br><div style="text-align: center">Witaj <b>${name} ${surname}.</b> Oto twoja rezerwacja:</br></br></br></div>
    <fieldset><form method="post" action="/rezerwacja">
    <div style="text-align: center">Numer rezerwacji:<b> ${reservationNumber} </b> </br>   Czy opłacona:<b> ${reservationInfo[0].isPaid}</b> </br>Pozostało do zapłaty:    <b> ${reservationInfo[0].price} PLN</b></br></br></br>
    <button type="submit" ><b>Opłać rezerwacje</b></button>
    </div>
    </form>
    </fieldset>`;
  }

  res.render("profil", {
    newReservationDiv,
  });
});

module.exports = router;

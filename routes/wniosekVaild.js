const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const {
  isNameVaild,
  isWniosekVaild,
  priceCalculate,
} = require("../sources/functions");
const { connectDB } = require("../config/db");
const { render } = require("ejs");
const { mainInformation, parkingSpaceReservation } = require("../model/models");

router.get("/", (req, res) => {
  res.send("Zloz wniosek!!");
});
router.post("/", async (req, res, next) => {
  // ### CHECK IS APPLICATION VAILD ### //
  const result = isWniosekVaild(
    req.body.imie,
    req.body.nazwisko,
    req.body.numer_rejestracyjny,
    req.body.czas_rozpoczecia,
    req.body.czas_zakonczenia,
    req.body.numer,
    req.body.email,
    req.body.ilosc_osob
  );

  if (!result) {
    connectDB();

    const mainInfo = await mainInformation.find();
    const _reservationNumber = mainInfo[0].rejestrationNumber;
    const _reservationCodeNumber = mainInfo[0].rejestrationCodeNumber;
    let _price = priceCalculate(
      req.body.czas_rozpoczecia,
      req.body.czas_zakonczenia
    );

    // ### CREATING A DATA TO SAVE TO DATABASE ### //
    const newReservation = new parkingSpaceReservation({
      name: req.body.imie,
      surname: req.body.nazwisko,
      phoneNumber: req.body.numer,
      registrationNumber: req.body.numer_rejestracyjny,
      arriveDate: req.body.czas_rozpoczecia,
      departuateDate: req.body.czas_zakonczenia,
      email: req.body.email,
      peopleQuantity: 3,
      reservationNumber: mainInfo[0].rejestrationNumber,
      reservationCode: mainInfo[0].rejestrationCodeNumber,
      price: _price,
      isPaid: "none",
      actual: "yes",
    });
    const newMainInfo = {
      pozostaleMiejsca: mainInfo[0].pozostaleMiejsca - 1,
      rejestrationNumber: mainInfo[0].rejestrationNumber + 1,
      rejestrationCodeNumber: mainInfo[0].rejestrationCodeNumber + 4,
    };

    // ### UPDATE MAIN INFORMATION ### //
    await mainInformation.updateOne({}, newMainInfo);
    console.log(newReservation);

    // ### CREATE NEW RESERVATION ### //
    await newReservation.save();

    // ### MESSAGE FOR EMAIL ### //
    let message =
      "Reservation number: " +
      mainInfo[0].rejestrationNumber +
      " ; Code number: " +
      mainInfo[0].rejestrationCodeNumber +
      " ; phoneNumber: " +
      req.body.numer;

    // ### DEFINING TRANSPORTER TO EMAIL ### //
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAILADDRESS,
        pass: process.env.EMAILPASS,
      },
    });

    // ### SENDING EMAIL ### //
    const mailOptions = {
      from: {
        name: "Parking test",
        address: process.env.EMAILADDRESS,
      },
      to: req.body.email,
      subject: "Your reservation information",
      text: message,
    };
    const sendEmail = async (transporter, mailOptions) => {
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        }
      });
    };
    sendEmail(transporter, mailOptions);
    // ### RENDERING PAGE ### //
    res.render("wniosekVaild");
  } else {
    res.render("wniosek", {
      nameEr: result.nameEr,
      registrationNumberEr: result.registrationNumberEr,
      arriveDepartuateEr: result.arriveDepartuateEr,
      phoneNumberEr: result.phoneNumberEr,
      emailEr: result.emailEr,
      arriveTimeEr: result.arriveTimeEr,
    });
  }
  next();
});

module.exports = router;

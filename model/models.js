const mongoose = require("mongoose");

const mainInformationsSchema = new mongoose.Schema({
  pozostaleMiejsca: Number,
  rejestrationCodeNumber: Number,
  rejestrationNumber: Number,
});

const mainInformation = mongoose.model(
  "maininformations",
  mainInformationsSchema
);

const parkingSpaceReservationSchema = new mongoose.Schema({
  name: String,
  surname: String,
  phoneNumber: Number,
  registrationNumber: String,
  arriveDate: String,
  departuateDate: String,
  email: String,
  peopleQuantity: Number,
  reservationNumber: Number,
  reservationCode: Number,
  price: Number,
  isPaid: String,
  actual: String,
});

const parkingSpaceReservation = mongoose.model(
  "parkingspacereservations",
  parkingSpaceReservationSchema
);

module.exports = { mainInformation, parkingSpaceReservation };

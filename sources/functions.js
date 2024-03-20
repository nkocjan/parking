// midlewear functions file

// ### CREATING DATA FROM TEXT ### //
function createDate(type) {
  let czas = type;
  let parts = czas.split("-");
  let rok = parseInt(parts[0], 10);
  let miesiac = parseInt(parts[1], 10) - 1;
  let dzien = parseInt(parts[2], 10);
  let dataJs = new Date(rok, miesiac, dzien);
  return dataJs;
}

// ### CALCULATING PRICE ### //
function priceCalculate(arriveDate, departuateDate) {
  let date1 = createDate(arriveDate);
  let date2 = createDate(departuateDate);
  let price = date2 - date1;
  price = price / 3600000;
  return price;
}

// ### CHECK IS NAME VAILD ### //

function isNameVaild(name) {
  if (name.length > 3) {
    return name;
  } else {
    return false;
  }
}

// ### CHECK IS REGISTRATION NUMBER VAILD ### //

function isRegistrationNumberVaild(registrationNumber) {
  registrationNumber = registrationNumber.replace(/ /g, "");
  if (registrationNumber.length == 8) {
    return true;
  } else {
    return false;
  }
}

// ### CHECK IS ARRIVE DATE BEFORE DEPARTUATE DATE ### //

function isArriveDepartuateVaild(arriveTime, departuateTime) {
  let arriveTimeValue = arriveTime;
  let departuateTimeValue = departuateTime;

  let date1 = new Date(arriveTimeValue);
  let date2 = new Date(departuateTimeValue);

  return date1 < date2;
}

// ### CHECK IS ARRIVE LATER THAN TODAY ### //

function isArriveVaild(arriveTime) {
  const newDate = new Date();
  let date1 = new Date(arriveTime);
  return newDate > date1;
}

// ### CHECK IS PHONE NUMBER VAILD ### //

function isPhoneNumberVaild(phoneNumber) {
  if (phoneNumber.length == 9) {
    return true;
  } else {
    return false;
  }
}

// ### CHECK IS EMAIL VAILD ### //

function isEmailVaild(email) {
  const regularExpression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
  return regularExpression.test(email);
}

// ### CHECK APPLICATION  ### //

function isWniosekVaild(
  name,
  surname,
  registrationNumber,
  arriveTime,
  departuateTime,
  phoneNumber,
  email,
  quantity
) {
  let errorObject = {
    nameEr: "",
    registrationNumberEr: "",
    arriveDepartuateEr: "",
    phoneNumberEr: "",
    emailEr: "",
    arriveTimeEr: "",
    vaild: 1,
  };

  if (!isNameVaild(name) || !isNameVaild(surname)) {
    errorObject.nameEr = "your name is too short";
    errorObject.vaild = 0;
  }
  if (!isRegistrationNumberVaild(registrationNumber)) {
    errorObject.registrationNumberEr = "wrong registration number";
    errorObject.vaild = 0;
  }
  if (!isArriveDepartuateVaild(arriveTime, departuateTime)) {
    errorObject.arriveDepartuateEr = "departuate time is before arrive time";
    errorObject.vaild = 0;
  }
  if (!isPhoneNumberVaild(phoneNumber)) {
    errorObject.phoneNumberEr = "wrong phone number";
    errorObject.vaild = 0;
  }
  if (isEmailVaild(email) || email == "") {
    errorObject.emailEr = "email is invaild";
    errorObject.vaild = 0;
  }
  if (isArriveVaild(arriveTime)) {
    errorObject.arriveTimeEr = "arrive time is wrong";
    errorObject.vaild = 0;
  }
  if (errorObject.vaild) {
    return 0;
  } else {
    //console.log(errorObject); - collision test
    return errorObject;
  }
}

module.exports = { isNameVaild, isWniosekVaild, priceCalculate, createDate };

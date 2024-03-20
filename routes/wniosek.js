const express = require("express");
const router = express.Router();
const { isNameVaild, isWniosekVaild } = require("../sources/functions");

// ### RENDERING WNIOSEK PAGE ### //

router
  .route("/")
  .get((req, res) => {
    res.render("wniosek");
  })
  .post((req, res) => {
    let _imie, _nazwisko;
    if (isNameVaild(req.body.imie)) {
      _imie = req.body.imie;
    } else {
      _imie = "";
    }
    if (isNameVaild(req.body.nazwisko)) {
      _nazwisko = req.body.nazwisko;
    } else {
      _nazwisko = "";
    }

    res.render("wniosek", {
      imie: _imie,
      nazwisko: _nazwisko,
    });
  });

module.exports = router;

const express = require("express");
const app = express();
const session = require("express-session");
require("dotenv").config();

app.use(
  session({
    secret: process.env.SECRETSESSION || "default-key", //
    resave: false, // magazynowanie sesji nawet jak nie nastąpiły w niej zmiany
    saveUninitialized: false, // Ustawienia sesji
  })
);

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require("./routes/index");
const profilRouter = require("./routes/profil");
const sprawdz_rezerwacjaRouter = require("./routes/sprawdz_rezerwacje");
const wniosekRouter = require("./routes/wniosek");
const wniosekVaildRouter = require("./routes/wniosekVaild");
const aktualizacja_bazyRouter = require("./routes/aktualizacja_bazy");
const rezerwacjaRouter = require("./routes/rezerwacja");
const paths = ["/index", "/"];
paths.forEach(path => {
  app.use(path, indexRouter);
});
app.use("/profil", profilRouter);
app.use("/sprawdz_rezerwacje", sprawdz_rezerwacjaRouter);
app.use("/wniosek", wniosekRouter);
app.use("/wniosekVaild", wniosekVaildRouter);
app.use("/aktualizacja_bazy", aktualizacja_bazyRouter);
app.use("/rezerwacja", rezerwacjaRouter);

app.listen(process.env.PORT);

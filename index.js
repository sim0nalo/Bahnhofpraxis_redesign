import { createApp } from "./config.js";

const app = createApp({
  user: "old_glade_3344",
  host: "bbz-cfp",
  database: "old_glade_3344",
  password: "a784a922a856aa6be8136ff839553591",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("start", {});
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

app.get("/profil", async function (req, res) {
  res.render("profil", {});
});

app.get("/detail", async function (req, res) {
  res.render("detail", {});
});

app.get("/logout", async function (req, res) {
  res.render("logout", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});

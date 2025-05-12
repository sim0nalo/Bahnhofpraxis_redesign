import { createApp, upload } from "./config.js";

const app = createApp({
  user: "old_glade_3344",
  host: "bbz.cloud",
  database: "old_glade_3344",
  password: "a784a922a856aa6be8136ff839553591",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  const posts = await app.locals.pool.query("select * from posts");
  for (const post of posts.rows) {
    post.text1 = post.text1.substring(0, 100) + "...";
  }
  res.render("start", { posts: posts.rows });
  res;
});

app.get("/impressum", async function (req, res) {
  const posts = await app.locals.pool.query("select * from posts");
  res.render("impressum", { posts: posts.rows });
});

/* app.get("/profil", async function (req, res) {
  const posts = await app.locals.pool.query(
    "SELECT * FROM posts WHERE user_id = $1",
    [req.session.userid]
  );
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  res.render("profil", {});
}); */

// Fetch user information

app.get("/detail/:id", async function (req, res) {
  const posts = await app.locals.pool.query(
    `select * from posts WHERE id = ${req.params.id}`
  );
  const liked = await app.locals.pool.query(
    "SELECT COUNT(user_id) FROM liked WHERE post_id = $1",
    [req.params.id]
  );
  res.render("detail", { posts: posts.rows, likes: liked.rows[0] });
});

app.get("/angebot", async function (req, res) {
  res.render("angebot", {});
});

app.get("/detail-sprechstunde", async function (req, res) {
  res.render("detail-sprechstunde", {});
});

app.get("/detail-labor", async function (req, res) {
  res.render("detail-labor", {});
});

app.get("/detail-praxisapotheke", async function (req, res) {
  res.render("detail-praxisapotheke", {});
});

app.get("/detail-notfaelle", async function (req, res) {
  res.render("detail-notfaelle", {});
});

app.get("/detail-hausbesuche", async function (req, res) {
  res.render("detail-hausbesuche", {});
});

app.get("/detail-kleinchirurgie", async function (req, res) {
  res.render("detail-kleinchirurgie", {});
});

app.get("/detail-impfen", async function (req, res) {
  res.render("detail-impfen", {});
});

app.get("/detail-testungen", async function (req, res) {
  res.render("detail-testungen", {});
});

app.get("/detail-roentgen", async function (req, res) {
  res.render("detail-roentgen", {});
});

app.get("/team", async function (req, res) {
  res.render("team", {});
});

app.get("/kontakt", async function (req, res) {
  res.render("kontakt", {});
});

app.get("/detail-team", async function (req, res) {
  res.render("detail-team", {});
});

app.get("/termin", async function (req, res) {
  res.render("termin", {});
});

app.get("/offene-stellen", async function (req, res) {
  res.render("offene-stellen", {});
});

app.get("/erklaerseite", async function (req, res) {
  res.render("erklaerseite", {});
});

app.get("/ausbildung", async function (req, res) {
  res.render("ausbildung", {});
});

app.get("/detail-angebot", async function (req, res) {
  res.render("detail-angebot", {});
});

app.get("/detail-kontakt", async function (req, res) {
  res.render("detail-kontakt", {});
});

app.get("/termin-patientendetails", async function (req, res) {
  res.render("termin-patientendetails", {});
});

app.get("/termin-bestaetigung", async function (req, res) {
  res.render("termin-bestaetigung", {});
});

app.get("/termin-behandlung", async function (req, res) {
  res.render("termin-behandlung", {});
});

app.get("/termin-datum", async function (req, res) {
  res.render("termin-datum", {});
});

app.get("/termin-abschliessen", async function (req, res) {
  res.render("termin-abschliessen", {});
});

app.get("/", async function (req, res) {
  res.render("start", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});

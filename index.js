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

app.get("/ausbildung", async function (req, res) {
  res.render("ausbildung", {});
});

app.get("/detail-angebot", async function (req, res) {
  res.render("detail-angebot", {});
});

app.get("/detail-kontakt", async function (req, res) {
  res.render("detail-kontakt", {});
});

app.get("/", async function (req, res) {
  res.render("start", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});

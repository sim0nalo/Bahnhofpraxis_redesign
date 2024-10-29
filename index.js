import { createApp } from "./config.js";

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
    post.text = post.text.substring(0, 100) + "...";
  }
  res.render("start", { posts: posts.rows });
});

app.get("/impressum", async function (req, res) {
  const posts = await app.locals.pool.query("select * from posts");
  res.render("impressum", { posts: posts.rows });
});

app.get("/profil", async function (req, res) {
  res.render("profil", {});
});

app.get("/detail/:id", async function (req, res) {
  const posts = await app.locals.pool.query(
    `select * from posts WHERE id = ${req.params.id}`
  );
  res.render("detail", { posts: posts.rows });
});

app.get("/logout", async function (req, res) {
  res.render("logout", {});
});

app.get("/new_post", async function (req, res) {
  res.render("new_post", {});
});

app.get("/login", async function (req, res) {
  res.render("login", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});

/*Formular_Start*/
app.get("/new_post", async function (req, res) {
  res.render("new_post", {});
});

app.post("create_post", async function (req, res) {
  await app.locals.pool.query(
    "INSERT INTO posts (cerated_at, title, text) VALUES ($1, $2, $3)",
    [req.body.created_at, req.body.title, req.body.text]
  );
  res.redirect("/");
});

/*Formular_Ende*/

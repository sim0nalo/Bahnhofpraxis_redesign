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

app.get("/profil", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }

  // Fetch user information
  const userResult = await app.locals.pool.query(
    "SELECT name FROM users WHERE id = $1",
    [req.session.userid]
  );
  const user = userResult.rows[0];

  res.render("profil", { user });
});

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

app.get("/logout", async function (req, res) {
  res.render("logout", {});
});

app.get("/new_post", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  res.render("new_post", {});
});

app.get("/login", async function (req, res) {
  res.render("login", {});
});

/*Formular_Start*/

app.post("/create_post", upload.array("img", 4), async function (req, res) {
  await app.locals.pool.query(
    "INSERT INTO posts (created_at, title, text1, text2, user_id, img1, img2, img3, img4) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      req.body.created_at,
      req.body.title,
      req.body.text1,
      req.body.text2,
      req.session.user_id,
      req.files[0].filename,
      req.files[1].filename,
      req.files[2].filename,
      req.files[3].filename,
    ]
  );
  res.redirect("/");
});

/*Formular_Ende*/

app.post("/like/:id", async function (req, res) {
  if (!req.session.userid) {
    res.redirect("/login");
    return;
  }
  await app.locals.pool.query(
    "INSERT INTO liked (post_id, user_id) VALUES ($1, $2)",
    [req.params.id, req.session.userid]
  );
  res.redirect("/");
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});

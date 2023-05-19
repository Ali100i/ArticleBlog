const express = require("express");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const Article = require("./models/article_model.js");
const htmlEscaper = require("html-escaper");
const FloraEditorSDK = require("flora-editor-sdk");
const fs = require("fs");
const path = require("path");
const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "html");

app.get("/", async (req, res) => {
  const articles = await Article.getAll();
  res.render("index", { title: "Home", articles });
});

app.get("/lang", (req, res) => {
  const lang = req.query.lang;
  res.cookie("lang", lang, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.send(`Cookie lang set to ${lang}`);
});

app.get("/new", (req, res) => {
  res.render("new_article", { title: "New Article" });
});

app.post("/new", async (req, res) => {
  const articleData = req.body;
  articleData.content = htmlEscaper.escape(articleData.content);
  articleData.arabicContent = htmlEscaper.escape(articleData.arabicContent);
  const result = await Article.addArticle(articleData);
  res.json(result);
});

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const articleDetail = await Article.getArticleDetail(id);
  res.render("new_article", { title: "Edit Article", articleDetail });
});

app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const articleData = req.body;
  articleData.content = htmlEscaper.escape(articleData.content);
  articleData.arabicContent = htmlEscaper.escape(articleData.arabicContent);
  const result = await Article.updateArticle(id, articleData);
  res.json(result);
});

app.post("/upload", async (req, res) => {
  const fileUrl = await FloraEditorSDK.uploadImage(req.files.image.path);
  fs.unlinkSync(req.files.image.path);
  res.json({ url: fileUrl });
});

app.delete("/articles/:article_id", async (req, res) => {
  const articleId = req.params.article_id;
  const result = await Article.deleteArticle(articleId);
  res.json(result);
});

app.put("/articles/:article_id/like", async (req, res) => {
  const articleId = req.params.article_id;
  const result = await Article.likeArticle(articleId);
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

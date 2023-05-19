const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("articles_store.db3", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the articles database.");
});

function addArticle(article_data) {
  const sql = `INSERT INTO articles (author, content) VALUES (?, ?)`;
  db.run(sql, [article_data.author, article_data.content], function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}

function updateArticle(article_id, data) {
  const sql = `UPDATE articles SET author = ?, content = ? WHERE id = ?`;
  db.run(sql, [data.author, data.content, article_id], function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });
}

function deleteArticle(article_id) {
  const sql = `DELETE FROM articles WHERE id = ?`;
  db.run(sql, article_id, function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log(`Row(s) deleted: ${this.changes}`);
  });
}

function likeArticle(article_id) {
  const sql = `UPDATE articles SET likes = likes + 1 WHERE id = ?`;
  db.run(sql, article_id, function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
  });
}

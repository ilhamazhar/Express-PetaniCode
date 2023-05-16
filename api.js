const express = require("express");
const bodyParser = require("body-parser");

const client = require("./connection");
const port = 3005;
const app = express();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(bodyParser.json());

client.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected");
  }
});

app.get("/books", (req, res) => {
  client.query("SELECT * FROM books", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  client.query(`SELECT * FROM books WHERE id = ${id}`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      res.send(err.message);
    }
  });
});

app.post("/books", (req, res) => {
  const { title, description, author } = req.body;
  client.query(
    `INSERT INTO books(title,description,author) VALUES('${title}', '${description}', '${author}')`,
    (err, result) => {
      if (!err) {
        res.send("Insert data success");
      } else {
        res.send(err.message);
      }
    }
  );
});

app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, description, author } = req.body;
  client.query(
    `UPDATE books
     SET title = '${title}', description = '${description}', author = '${author}'
     WHERE id = '${id}'`,
    (err, result) => {
      if (!err) {
        res.send("Update data success");
      } else {
        res.send(err.message);
      }
    }
  );
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  client.query(`DELETE FROM books WHERE id = ${id}`, (err, result) => {
    if (!err) {
      res.send("Delete data success");
    } else {
      res.send(err.message);
    }
  });
});

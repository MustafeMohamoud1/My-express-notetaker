const express = require("express");
const path = require("path");
//const api = require('./routes/index.js');
let dataBase = require("./db/db.json");
const fs = require('fs')
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data - used to configure express while server runs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for feedback page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.json(dataBase);
});

app.post("/api/notes", (req, res) => {
let noteBody = {
    title:req.body.title,
    text:req.body.text,
    id: Math.random()
}
dataBase.push(noteBody)

fs.writeFileSync('./db/db.json', JSON.stringify(dataBase))
  res.json(dataBase);
});
// // Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );

// localhost:3001/
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

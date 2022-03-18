const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let notes = JSON.parse(data);
    res.send(notes);
  });
});

app.post("/api/notes", (req, res) => {
  req.body.id = db.length.toString();
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let notes = JSON.parse(data);
    const note = req.body;
    notes.push(note);
    fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify(notes, null, 2)
    );
    res.send(notes);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Set server to listen on port
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

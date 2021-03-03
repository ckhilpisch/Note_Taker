const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const notesDatapath = path.join(__dirname, "../db/db.json");
// const savedNotes = [];

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile(notesDatapath, "utf-8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        let savedNotes = JSON.parse(data);
        res.json(savedNotes);
      }
    });
  });

  app.post("/api/notes", function (req, res) {
    
    fs.readFile(notesDatapath, "utf-8", function (err, data) {
      let savedNotes;
      if (err) {
        console.log(err);
      } else if (data) {
        savedNotes = JSON.parse(data);
      }
      let newNote = req.body;
      newNote.id = uuidv4();

      if (savedNotes) {
        savedNotes.push(newNote);
      } else {
        savedNotes = [newNote];
      }

      fs.writeFile(notesDatapath, JSON.stringify(newNote), "utf-8", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(savedNotes);
        }
      });
      res.json(savedNotes);
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(notesDatapath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const newData = JSON.parse(data);
        const deleted = req.params.id;
        console.log(data);
        notes = newData.filter((data) => data.id != deleted);
        fs.writeFile(notesDatapath, JSON.stringify(notes), "utf-8", (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.json(notes);
      }
    });
  });
};

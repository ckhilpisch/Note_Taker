const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const notesDatapath  = path.join(__dirname, "../db/db.json");
const savedNotes = [];

module.exports = function (app) {
  //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", function (req, res) {
    fs.readFile(notesDatapath, "utf-8", function (err, data) {
      if (err) {
        console.log(err);
      } else {
        const savedNotes = JSON.parse(data);
        res.json(savedNotes);
      }
    });
  });
  //   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
  app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    newNote.id = uuidv4();
    savedNotes.push(newNote);

    fs.writeFile(notesDatapath, JSON.stringify(savedNotes), "utf-8", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(savedNotes);
      }
    });
    res.json(savedNotes);
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
        fs.writeFile(notesDatapath, "utf-8", (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.json(notes);
      }
    });
  });
};

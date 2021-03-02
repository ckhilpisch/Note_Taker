const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
//getting the note data from the json file:
const notesData = require("../db/db.json");
savedNotes = [];

module.exports = function (app) {
  //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", function (req, res) {
    fs.readFile("../Develop/db/db.json", "utf-8", (err, data) => {
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

    fs.writeFile("../Develop/db/db.json", "utf-8", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(savedNotes);
      }
    });
    res.json(savedNotes);
  });

  //   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("../Develop/db/db.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const newData = JSON.parse(data);
        const deleted = req.params.id;
        console.log(data);
        notes = newData.filter((data) => data.id != deleted);
        fs.writeFile("../Develop/db/db.json", "utf-8", (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.json(notes);
      }
    });
  });
};

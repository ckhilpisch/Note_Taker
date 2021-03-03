const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const notesDatapath = path.join(__dirname, "../db/db.json");
// const savedNotes = [];

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile(notesDatapath, "utf-8", function (err, data) {
      if (err) {
        res.status(500).send({error : "couldn't read saved notes"});
      } else {
        let savedNotes = JSON.parse(data);
        res.json(savedNotes);
      }
    });
  });

  app.post("/api/notes", function (req, res) {
    console.log(notesDatapath);
    fs.readFile(notesDatapath, "utf-8", function (err, data) {
      if (err) {
        res.status(500).send({error : "couldn't read saved notes"});
      } 
      let savedNotes = [];
      if (data) {
      savedNotes =JSON.parse(data);
      }
      console.log(savedNotes);

      let newNote = req.body;
      newNote.id = uuidv4();

      // if (savedNotes) {
      savedNotes.push(newNote);
      // } else {
      //   savedNotes = [newNote];
      // }

      fs.writeFile(notesDatapath, JSON.stringify(savedNotes), "utf-8", (err) => {
        if (err) {
          res.status(500).send({error : "couldn't add new note"});;
        } else {
          console.log(savedNotes);
          res.json(savedNotes);
        }
      });  
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(notesDatapath, "utf-8", (err, data) => {
      if (err) {
        res.status(500).send({error : "couldn't delete note"});  
      } else {
        const newData = JSON.parse(data);
        const deleted = req.params.id;
        console.log(data);
        let notes = newData.filter((data) => data.id != deleted);
        fs.writeFile(notesDatapath, JSON.stringify(notes), "utf-8", (err) => {
          if (err) {
            res.status(500).send({error : "couldn't write after deleted note"});
          }
          res.json(notes);
        });  
      }
    });
  });
};

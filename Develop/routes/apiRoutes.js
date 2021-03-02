const uuid = require('uuid');
//getting the note data from the json file:
const notesData = require("../db/db.json");

module.exports = function (app) {
    //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
    app.get("/api/notes", function (req, res) {
        res.json(notesData)
    });
    //   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post("/api/notes", function (req, res) {
        const id = uuid.v4();
        notesData.push(req.body);
        res.json(true);

    });
    //   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    app.delete("/api/notes/:id", function (req, res) {
        let id = req.params.id;
        notesData.delete(id, function (err, data) {
          if (err) {
            return next(err);
          }
          res.json(data);
        res.json(true);
        });
    });

}

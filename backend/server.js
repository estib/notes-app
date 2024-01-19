
const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database")

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let currentDate = new Date();
let timestamp = currentDate.getTime();

const HTTP_PORT = 3000 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// endpoints
app.get("/api/notes", (req, res, next) => {
    var sql = "SELECT * FROM notes WHERE content LIKE ? OR name LIKE ? ORDER BY updated_date DESC;"
    var query = `%${req.query.q || ""}%`
    var sql_params = [query, query]
    db.all(sql, sql_params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    })
})

app.get("/api/note/:id", (req, res, next) => {
    var sql = "SELECT * FROM notes WHERE id = ?;"
    var sql_params = [req.params.id]
    db.get(sql, sql_params, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    })
})

app.post("/api/note/", (req, res, next) => {
    var errors = []
    currentDate = new Date();
    timestamp = currentDate.getTime();
    for (required of ["name", "content"]) {
        if (!req.body[required]) {
            errors.push(`Required field not provided: ${required}`)
        }
    }

    if (errors.length) {
        res.status(400).json({"error": errors.join(" \n ")});
        return;
    }
    // set any param defaults
    var inputs = {
        "name": req.body.name,
        "content": req.body.content,
        "tags": req.body.tags || "",
    }
    var sql = "INSERT INTO notes (name, created_date, updated_date, content, tags) VALUES (?,?,?,?,?);"
    var sql_params = [
        inputs.name, 
        timestamp, 
        timestamp, 
        inputs.content, 
        inputs.tags,
    ]
    db.run(sql, sql_params, function (err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": inputs,
            "id": this.lastID
        })
    });
})

app.patch("/api/note/:id", (req, res, next) => {
    currentDate = new Date();
    timestamp = currentDate.getTime();
    var inputs = {
        "name": req.body.name,
        "content": req.body.content,
        "tags": req.body.tags,
    }

    var sql = `
      UPDATE notes 
      SET name = COALESCE(?, name),
        content = COALESCE(?, content),
        tags = COALESCE(?, tags),
        updated_date = ?
      WHERE id = ?`
    var sql_params = [
        inputs.name,
        inputs.content,
        inputs.tags,
        timestamp,
        parseInt(req.params.id)
    ]
    db.run(sql, sql_params, function (err, result) {
        if (err) {
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({
            "message": "success",
            "data": inputs,
            "changes": this.changes
        })
    });
})

app.delete("/api/note/:id", (req, res, next) => {
    var sql = "DELETE FROM notes WHERE id = ?"
    var sql_params = [parseInt(req.params.id)]
    db.run(sql, sql_params, function (err, results) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "deleted", 
            "changes": this.changes
        })
    })
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

const currentDate = new Date();
const timestamp = currentDate.getTime();

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            created_date INTEGER,
            updated_date INTEGER, 
            content TEXT, 
            tags TEXT
            )`,
        (err) => {
            if (err) {
                // Table exists
            } else {
                // Initiate table with example note. 
                var insert = 'INSERT INTO notes (name, created_date, updated_date, content, tags) VALUES (?,?,?,?,?)'
                db.run(insert, ["example", timestamp, timestamp, "write some notes here", "patient:sally,type:consultation"])
            }
        });  
    }
});


module.exports = db

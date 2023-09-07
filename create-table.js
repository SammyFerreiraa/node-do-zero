import { sql } from  "./db.js"

// sql`DROP TABLE IF EXISTS videos`.then(() => {
//   console.log("Database deleted")
// })

sql`
CREATE TABLE videos (
  id TEXT PRIMARY KEY,
  title TEXT,
  description TEXT,
  duration INTEGER
);
`.then(() => {
  console.log("Database created")
})
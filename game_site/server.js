const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");

const app = express();

/* =========================
   PORT (IMPORTANT FOR HOSTING)
========================= */
const PORT = process.env.PORT || 3000;

/* =========================
   DATABASE
========================= */
const db = new Database("./data/games.db");

/* Create table if not exists */
db.exec(`
CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_name TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

/* =========================
   MIDDLEWARE
========================= */
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

/* SERVE FRONTEND */
app.use(express.static(path.join(__dirname, "public")));

/* FORCE HOME PAGE */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =========================
   API: SUBMIT GAME
========================= */
app.post("/api/submit-game", (req, res) => {
    const { gameName } = req.body;

    if (!gameName) {
        return res.status(400).json({ error: "Missing game name" });
    }

    db.prepare(`
        INSERT INTO submissions (game_name)
        VALUES (?)
    `).run(gameName);

    res.json({ success: true });
});

/* =========================
   API: GET SUBMISSIONS (ADMIN ONLY)
========================= */
const ADMIN_PASSWORD = "tommy0812";

app.get("/api/submissions", (req, res) => {
    const pass = req.query.password;

    if (pass !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const data = db.prepare(`
        SELECT * FROM submissions
        ORDER BY id DESC
    `).all();

    res.json(data);
});

/* =========================
   API: DELETE SUBMISSION
========================= */
app.delete("/api/submissions/:id", (req, res) => {
    const pass = req.query.password;

    if (pass !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    db.prepare(`
        DELETE FROM submissions WHERE id = ?
    `).run(req.params.id);

    res.json({ success: true });
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, "0.0.0.0", () => {
    console.log("=================================");
    console.log(" SteamGear Arcade Running");
    console.log(" Port:", PORT);
    console.log("=================================");
});

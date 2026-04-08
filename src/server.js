// Server import
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Routes import
import brukerRoutes from "../src/routes/authRoutes.js";
import maskinRoutes from "../src/routes/maskinRoutes.js";

// __dirname i ESM (Type måte å definere dynamiske filstier)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initierer express som en konstant
const app = express();

// Grunnleggende middleware
app.use(express.json());

// Statiske filer
app.use(express.static(path.join(__dirname, "..", "public")));

// API Routes, Vi bruker falske rutinger fra frontend og ruter til de riktige filstier
app.use("/api/auth", brukerRoutes);
app.use("/api/maskiner", maskinRoutes);

// HTML-sidene vi bruker i prosjektet
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/start", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "hjemmeside.html"));
});

app.get("/maskiner", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "maskiner.html"));
});

// Serveren og hvilken port den skal lytte til
app.listen(3000, () => console.log("Server kjører på http://localhost:3000"));
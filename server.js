// server.js
const express = require("express");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// server.js
app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY; // Use the API key from environment variables

    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    let weather;
    let error = null;
    try {
        const response = await axios.get(APIUrl);
        weather = response.data;
    } catch (err) {
        weather = null;
        error = "Error, Please try again";
    }
    res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

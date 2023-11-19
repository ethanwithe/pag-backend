const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const pediRoutes = require("./routes/pedi");
const progRoutes = require("./routes/prog");
const promoRoutes = require("./routes/promo");

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use("/api", pediRoutes);
app.use("/api", progRoutes);
app.use("/api", promoRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.listen(port, () => console.log("Server listening on port", port));

const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

// Connect to MongoDB
connectDB();

// Routes
app.use(routes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

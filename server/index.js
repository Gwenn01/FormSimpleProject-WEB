const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// application
const app = express();
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Corrected typo here
app.use(cors());

// ROUTES
app.use("/", require("./routes/app"));

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();

const express = require("express");
const logger = require("morgan");
//const cors

require("./configs/db.config");

const app = express()

// Middlewares

// Routes

// Error handlers

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application running at port ${port}`))
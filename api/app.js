require("dotenv").config();

const express = require("express");
//const cors

require("./configs/db.config");

const app = express()

// Middlewares
app.use(express.json());

// Routes
const routes = require("./configs/routes.config");
app.use(routes);

// Error handlers

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application running at port ${port}`))
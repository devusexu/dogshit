require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const { authRouter, taskRouter } = require("./routes");
const { limiter, isAuthenticated, errorHandler } = require("./middlewares");

const app = express();

app.use(limiter);
app.use(helmet());
app.use(express.json());

// const fs = require('fs');
// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yaml');

// const file = fs.readFileSync('./swagger.yaml', 'utf8');
// const swaggerDocument = YAML.parse(file);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", authRouter);
app.use("/api/tasks", isAuthenticated, taskRouter);

app.use(errorHandler);

module.exports = app;

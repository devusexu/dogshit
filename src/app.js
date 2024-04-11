require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const { authRouter, taskRouter } = require("./routes");
const isAuthenticated = require("./middlewares/authenticator");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(express.json());

// const fs = require('fs');
// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yaml');

// const file = fs.readFileSync('./swagger.yaml', 'utf8');
// const swaggerDocument = YAML.parse(file);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connect successfully");
}

main().catch(console.log);

app.use("/api/users", authRouter);
app.use("/api/tasks", isAuthenticated, taskRouter);

app.use(errorHandler);

app.listen(3000);

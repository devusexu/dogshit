require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const authRouter = require("./src/routes/auth");
const taskRouter = require("./src/routes/task");
const isAuthenticated = require("./src/middlewares/authenticator");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

// assume request body is json object
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

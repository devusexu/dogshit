require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');
const isAuthenticated = require('./middlewares/authenticator');
const { BadRequestError, AuthenticationError, NotFoundError, ConflictError, CustomError } = require('./utils/error');
const app = express();

// assuem request body is json object 
app.use(express.json());

// const fs = require('fs');
// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yaml');

// const file = fs.readFileSync('./swagger.yaml', 'utf8');
// const swaggerDocument = YAML.parse(file); 

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

main().catch(console.log);
async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connect successfully');
}

app.use('/api/users', authRouter);
app.use('/api/tasks', isAuthenticated, taskRouter);

app.use((err, req, res, next) => {
    console.error(err);

    if (err.isJoi) {
        return res.status(422).json({
            message: err.details[0].message
        });
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        // Handle CastError due to incorrect _id format
        return res.status(400).json({ message: 'Invalid ObejctId format' });
    }

    if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
        // Duplicate email error (MongoDB unique constraint violation)
        return res.status(409).json({
            message: 'Email already exists'
        });
    }
    
    return res.status(500).json({
        message: 'Internal Server Error'
    });
});

app.listen(3000);
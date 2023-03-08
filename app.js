require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// connect db
const connectionDB = require('./db/connection');

// routes
const authRoute = require('./routes/auth.route');
const jobRoute = require('./routes/job.route');

// error handler
const notFoundMiddleware = require('./middleware/not-found.middleware');
const errorHandlerMiddleware = require('./middleware/error-handler.middleware');

app.use(express.json());

// extra packages

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', jobRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectionDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

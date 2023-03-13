require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

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

// extra packages
const { verifyJwtToken } = require('./middleware/jwt.middleware');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', verifyJwtToken, jobRoute);

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

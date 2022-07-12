import express, { json } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();

import router from './routers/index.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';

const app = express();
app.use(json());
app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});

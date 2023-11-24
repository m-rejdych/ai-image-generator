import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

import { genericErrorHandler } from './util/error';
import { router as authRouter } from './routes/auth';

config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);
app.use(genericErrorHandler);

app.listen(parseInt(process.env.PORT), process.env.HOST, () => console.log('Server is running'));

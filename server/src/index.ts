import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

import { genericErrorHandler } from './util/error';
import { validateAuthorizationApiKey } from './middleware/auth';
import { router as authRouter } from './routes/auth';
import { router as imageRouter } from './routes/image';

config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/image', validateAuthorizationApiKey, imageRouter);
app.use(genericErrorHandler);

app.listen(parseInt(process.env.PORT), process.env.HOST, () => console.log('Server is running'));

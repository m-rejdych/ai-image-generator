import express from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(parseInt(process.env.PORT), process.env.HOST, () => console.log('Server is running'));

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/users';
import custumerRouter from './routes/custumers';

dotenv.config();
const app = express();

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : '';

mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to the database');
});

app.use(express.json());
app.use(userRouter);
app.use(custumerRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

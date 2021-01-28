import 'dotenv/config';
import express from 'express';
import { json } from 'body-parser';
import { userRouter } from './routes/user';
import mongoose from 'mongoose';

const app = express();
app.use(json());
app.use(userRouter);

mongoose.connect(process.env.MONGODB_URI!, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to Mongoose database');
})

app.get("/", (_, res) => {
    res.send("Server is working");
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})
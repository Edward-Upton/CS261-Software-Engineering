import 'dotenv/config';
import express from 'express';
import { json } from 'body-parser';
import { userRouter } from './routes/user';
import mongoose from 'mongoose';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://127.0.0.1:3000",
        methods: ["GET", "POST"]
    }
});

app.use(json());
app.use(userRouter);

mongoose.connect(process.env.MONGODB_URI!, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to Mongoose database on MongoDB Atlas');
})

app.get("/", (_, res) => {
    res.send("Server is working");
})

io.on('connection', () => {
    console.log("Someone connected to default namespace");
})

http.listen(3000, () => {
    console.log("Server listening on port 3000");
})
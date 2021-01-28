import express from 'express';
import { User } from '../models/user';

const router = express.Router();

router.get("/api/user", async (_req, res) => {
    const user = await User.find({});
    return res.status(200).send(user);
})

router.post("/api/user", async (req, res) => {
    const { email, password } = req.body;

    const user = User.build({ email, password });
    await user.save();
    return res.status(201).send(user);
})

export { router as userRouter }
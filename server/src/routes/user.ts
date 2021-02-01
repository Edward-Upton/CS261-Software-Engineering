import { Router, Request, Response } from "express";

import User from "../models/user";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users, count: users.length });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    return res.status(201).send({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;

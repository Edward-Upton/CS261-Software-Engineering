import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user";

const router = Router();

// Get all users
// This shouldn't really stay here since not secure
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ users, count: users.length });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// Send Email and Password in Body
router.post("/login", async (req: Request, res: Response) => {
  try {
    // Attempt to create a user
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(500).send({ message: "Password doesn't match" });
    }
    // Login in successful
    return res.status(201).send({ message: "Logged in", id: user._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Successfully create new user
    return res.status(201).send({ message: "Registered", id: user._id });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;


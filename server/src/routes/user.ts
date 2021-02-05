import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";

import User, { IUser } from "../models/user";

const router = Router();

/**
 * HTTP GET "/"
 *
 * Returns 200 OK with all the users in the database.
 * Returns 500 Internal Server Error if server error.
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    // Retrieve all users from database, ignoring the password field.
    const users: [IUser] = await User.find({}).select({ password: 0 });
    // Return the array of all users and the count.
    return res.status(200).json({ users, count: users.length });
  } catch (error) {
    // If error, return error object.
    return res.status(500).json({ error });
  }
});

/**
 * HTTP POST "/login"
 *
 * Accepts email and password in body.
 *
 * Returns 200 OK if successful login.
 * Returns 400 Bad Request if incorrect request body.
 * Returns 401 Unauthorized if incorrect credentials.
 * Returns 500 Internal Server Error if server error.
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    // Retrieve email and password from request body.
    const { email, password }: IUser = req.body;
    // Check body contains required fields, if not return 400 Bad Request.
    if (!email || !password)
      return res.status(400).json({ message: "Requires email and password" });
    // Retrieve user account from database with same email.
    const user: IUser = await User.findOne({ email: email });
    // Check if user exists, if not return 401 Unauthorized.
    if (!user) return res.status(401).json({ message: "User does not exist" });
    // Compare the entered password to the stored hash.
    const result: boolean = await bcrypt.compare(password, user.password);
    // If the password does not match, return 401 Unauthorized.
    if (!result)
      return res.status(401).json({ message: "Password doesn't match" });
    // If the password matches, return 200 OK and the user.
    return res.status(200).json({ message: "Success", user });
  } catch (error) {
    // If error, return error object.
    return res.status(500).json({ error });
  }
});

/**
 * HTTP POST "/register"
 *
 * Accepts email and password in body.
 * Returns 202 Created if account successfully registered.
 * Returns 400 Bad Request if incorrect request body.
 * Returns 500 Internal Server Error if server error.
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    // Retrieve email and password from request body.
    const { email, password }: IUser = req.body;
    // Check body contains required fields, if not return 400 Bad Request.
    if (!email || !password)
      return res.status(400).json({ message: "Requires email and password" });
    // Hash the entered password.
    const hash: string = await bcrypt.hash(password, 10);
    // Create a new user with provided email and hash and save to database.
    const user: IUser = new User({ email, password: hash });
    await user.save();
    // Return 202 Created and the user id.
    return res.status(201).send({ message: "Registered", user });
  } catch (error) {
    // If error, return error object.
    return res.status(500).json({ error });
  }
});

export default router;

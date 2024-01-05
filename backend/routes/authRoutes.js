const express = require("express")
const userRouter = express.Router()
const bcrypt = require('jsonwebtoken')
const userModel = require("../models/userModel")



const asyncHandler = fn =>
    (req, res, next) =>
        Promise.resolve(fn(req, res, next)).catch(next);

userRouter.post("/register", asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
        return res.status(400).send("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ msg: "Registration has been done", newUser });
}));

userRouter.post("/login", asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "No such user exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Wrong Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "cicd-mern");
    res.status(200).json({ msg: "Login successful!", token });
}));

userRouter.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('An unexpected error occurred');
});

module.exports= userRouter
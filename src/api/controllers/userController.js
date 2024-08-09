const { USERS, TASKS } = require("../models");
const { asyncErrorHandler, CustomError } = require("../helpers");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret, token_timeout } = require("../../config/config");
const {sendMail} = require("../helpers/sendMail");
const {htmlMail} = require("../helpers/htmlMail");

const signup = asyncErrorHandler(async (req, res) => {
  const userDetails = req.body;
  const regNo = userDetails.regNo;
  const password = userDetails.password;
  const username = userDetails.username;
  const email = userDetails.email;
  const phNo = userDetails.phNo;
  const branch = userDetails.branch;
  const year = userDetails.year;

  if (
    !password ||
    !username ||
    !regNo ||
    !phNo ||
    !branch ||
    !year ||
    !password
  ) {
    throw new CustomError("Fill all the details", 401);
  }

  const user = await USERS.findOne({ regNo });

  if (user) {
    throw new CustomError("User already exists", 401);
  } else {
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      username,
      email,
      regNo,
      phNo,
      branch,
      year,
      password: hashpassword,
    };

    const newUser = new USERS(payload);
    const newTask = new TASKS({
      regNo: regNo,
      email: email,
      domain1: {
        description: userDetails.domain1.description,
        drive: userDetails.domain1.drive,
      },
      domain2: {
        description: userDetails.domain2.description,
        drive: userDetails.domain2.drive,
      },
    });
    await newUser.save();
    await newTask.save();
    sendMail(
      email,
      "Thank you for registering with Skills++ 2024",
      "",
      htmlMail(username)
    );
    res.json({ message: "Signed up successfully" });
  }
});

const login = asyncErrorHandler(async (req, res) => {
  const userDetails = req.body;
  const reg = {
    email: userDetails.email,
    password: userDetails.password,
  };
  const user = await USERS.findOne({ email: reg.email });
  if (!user) {
    throw new CustomError("Invalid credentials", 403);
  }

  const verifyPassword = await bcryptjs.compare(reg.password, user.password);
  if (!verifyPassword) {
    throw new CustomError("Invalid credentials", 403);
  }

  const token = jwt.sign({ email: reg.email }, jwt_secret, {
    expiresIn: token_timeout,
  });
  res.json({ message: "Logged in successfully", token });
});

const getUser = asyncErrorHandler(async (req, res) => {
  const email = req.user.email;
  const user = await USERS.findOne({ email });
  const regNo = user.regNo;
  const task = await TASKS.findOne({ regNo });

  if (!user) {
    throw new CustomError("User not found", 403);
  }
  if (!task) {
    throw new CustomError("Task not found", 403);
  }

  const userData = {
    username: user.username,
    email: user.email,
    domain1: task.domain1,
    domain2: task.domain2,
  };
  res.json({ userData });
});

const getUserEmail = asyncErrorHandler(async (req, res) => {
  const email = req.user.email;
  const user = await USERS.findOne({ email });
  res.json({
    username: user.username,
  });
});

const getUserName = asyncErrorHandler(async (req, res) => {
  const tasks = await TASKS.find({});
  console.log(tasks);
  res.json({
    tasks: tasks,
  });
});

const updateUserDomain = asyncErrorHandler(async (req, res) => {
  const user = await TASKS.findOneAndUpdate(
    { regNo: req.body.regNo },
    req.body,
    { new: true }
  );
  if (user) {
    res.json({ message: "user updated successfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const updateTask = asyncErrorHandler(async (req, res) => {
  try {
    const { domain, week } = req.body;
    const user = await TASKS.findOneAndUpdate(
      { _id: req.params.id },
      { [`${domain}.${week}.isCompleted`]: true },
      { new: true }
    );
    res.json({ message: "Approved successfully" });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

module.exports = {
  signup,
  login,
  getUser,
  getUserEmail,
  updateUserDomain,
  getUserName,
  updateTask
};

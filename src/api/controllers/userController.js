const { USERS, TASKS } = require('../models')
const { asyncErrorHandler, CustomError } = require('../helpers')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../../config/config');
const { log } = require('winston');

const signup = asyncErrorHandler(async (req, res) => {
    
    const userDetails = req.body;
    const regNo = userDetails.regNo;
    const password = userDetails.password;
    const username = userDetails.username;
    const email = userDetails.email;
    const phNo = userDetails.phNo;
    const branch = userDetails.branch;
    const year = userDetails.year;

    if(!password || !username || !regNo || !phNo || !branch || !year || !password){
        throw new CustomError("Fill all the details", 401);
    }

    const user = await USERS.findOne({ regNo });

    if (user) {
        throw new CustomError("User already exists", 401);
    }
    else {
        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)
        
        const payload={
            username,
            email,
            regNo,
            phNo,
            branch,
            year,
            password: hashpassword
        }

        const newUser = new USERS(payload);
        const newTask = new TASKS({
            regNo: userDetails.regNo,
            domain1: {
                description: userDetails.domain1.description,
                drive: userDetails.domain1.drive1
            },
            domain2: {
                description: userDetails.domain2.description,
                drive: userDetails.drive2
            }
        })
        let abc= await newUser.save();
        console.log(abc);
        let cde=await newTask.save();
        console.log(cde);
        res.json({ message: 'User created successfully' });
    }
})

const login = asyncErrorHandler(async (req, res) => {
    const userDetails = req.body;
    const reg = {
        email: userDetails.email,
        password: userDetails.password
    }
    const user = await USERS.findOne({email: reg.email});
    if(!user){
        res.status(403).json({message:"Invalid credentials"});
    }
    
    const verifyPassword=await bcryptjs.compare(reg.password,user.password)
    if(!verifyPassword){
        throw new CustomError("Invalid credentials", 401);
    }
    
    const token = jwt.sign({ email: reg.email, role: 'user' }, jwt_secret, { expiresIn: process.env.TOKEN_TIMEOUT });
    res.json({ message: 'Success!', token });
})

const getUser = asyncErrorHandler(async (req, res) => {
    const email = req.user.email;
    const user = await USERS.findOne({ email });
    const regNo = user.regNo;
    const task = await TASKS.findOne({ regNo });
    
    const userData = {
        username: user.username,
        email: user.email,
        domain1: task.domain1,
        domain2: task.domain2
    }
    if (user) {
        res.json({ userData });
    } else {
        res.status(403).json({ message: 'User not found' });
    }
})

const getUserEmail = asyncErrorHandler(async (req, res) => {
    const email = req.user.email;
    const user = await USERS.findOne({ email });
    console.log(user);
    res.json({
        username: user.username
    })
})

const getUserName=asyncErrorHandler(async (req, res) => {
  
    const tasks = await TASKS.find({ });
    console.log(tasks);
    res.json({
      tasks:tasks
    })
  })

const updateUserDomain = asyncErrorHandler(async (req, res) => {
    const user = await TASKS.findOneAndUpdate({ regNo: req.body.regNo }, req.body, { new: true });
    if (user) {
        res.json({ message: 'user updated successfully' });
    } else {
        res.status(404).json({ message: 'user not found' });
    }
})

module.exports = {signup,login,getUser,getUserEmail,updateUserDomain,getUserName};
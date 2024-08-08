const { USERS, TASKS } = require('../models')
const { asyncErrorHandler, CustomError } = require('../helpers')

const signup = asyncErrorHandler(async (req, res) => {
    const userDetails = req.body;
    const regNo = userDetails.regNo;
    const user = await USERS.findOne({ regNo });

    if (user) {
        throw new CustomError("User already exists", 401);
    }
    else {
        const newUser = new USERS(userDetails);
        const newTask = new TASKS({
            regNo: userDetails.regNo,
            domain1: {
                description: userDetails.domain1,
                drive: userDetails.drive1
            },
            domain2: {
                description: userDetails.domain2,
                drive: userDetails.drive2
            }
        })
        await newUser.save();
        await newTask.save();
        res.json({ message: 'User created successfully' });
    }
})

const login = asyncErrorHandler(async (req, res) => {
    const userDetails = req.body;
    const reg = {
        email: userDetails.email,
        password: userDetails.password
    }
    const user = await USERS.findOne(reg);
    if (user) {
        const token = jwt.sign({ email: reg.email, role: 'user' }, SECRET, { expiresIn: process.env.TOKEN_TIMEOUT });
        res.json({ message: 'User found successfully', user, token });
    } else {
        res.status(403).json(user);
    }
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
    res.json({
        username: user.username
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

module.exports = {signup,login,getUser,getUserEmail,updateUserDomain}
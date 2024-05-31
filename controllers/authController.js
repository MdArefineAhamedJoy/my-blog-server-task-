const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { genaratedToken } = require('../utils/authUtils');

exports.register = async (req, res) => {
    console.log(req.body)
    const { name, email, phoneNumber, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({ where: { email } })
        if (user) return res.status(404).json({ error: 'User All Ready Exist ' });
        const users = await User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body, '............login')
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

        console.log(token)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.verifyToken = (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.json({ message: 'Token is valid' });
    } catch (error) {
        res.status(400).json({ error: 'Token is not valid' });
    }
};

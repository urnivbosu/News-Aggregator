const User = require('../model/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.signup = async (req, res) => {
    try {
        const {username, password} = req.body;
        if(!username || !password) {
            return res.status(500).json({
                success: false,
                message: 'Please provide all data'
            })
        }
        const updatedPassword = await bcrypt.hash(password,10);
        await User.create({username, password: updatedPassword});
        return res.status(200).json({
            success: true,
            message: 'User Registered'
        })   
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: true,
            message: 'Unable to sign up'
        })
    }
}

exports.login = async(req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(500).json({
                success: false,
                message: 'Please provide all data'
            })
        }
        const user = await User.findOne({username: username});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'No user found'
            })
        }
        const payload = {
            id: user._id,
            username: user.username
        }
        if(await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })
            user.password = undefined;
            return res.status(200).json({
                success: true,
                token,
                user,
                message: 'User Logged In Successfully'
            })
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Incorrect Password'
            })
        }
        
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({
            success: true,
            message: 'Unable to login'
        })
    }

}
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captian.model');
const captianService = require('../services/captain.service');
const { validationResult } = require('express-validator')

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password, vehical } = req.body

    const isCaptainAlreadyExist = await captainModel.findOne({ email })
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' })
    }
    const hashPassword = await captainModel.hashPassword(password)

    const captain = await captianService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehical.color,
        plate: vehical.plate,
        capacity: vehical.capacity,
        vehicalType: vehical.vehicalType
    })

    const token = captain.generateAuthToken()

    res.status(201).json({ token, captain })
}


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    const captain = await captainModel.findOne({ email }).select('+password')
    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" })
    }
    const isMatch = await captain.comparePassword(password)
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" })
    }

    const token = captain.generateAuthToken()

    res.cookie('token', token);
    res.status(200).json({ token, captain })
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    await blacklistTokenModel.create({token})
   res.clearCookie('token')
   res.status(200).json({message:'Logout successfully'})
}
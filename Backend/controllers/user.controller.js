const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.resgisterUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password } = req.body;
     const isUserAlreadyExist = await userModel.findOne({ email })
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exists' })
    }
    const hashpassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashpassword
    })

    const token = user.generateAuthToken()
    res.status(201).json({ token, user });
}


module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password')
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' })
    }
    const token = user.generateAuthToken();
    res.cookie('token', token)
    res.status(201).json({ token, user })
}


module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}


module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization
    await blacklistTokenModel.create({ token })
    res.status(200).json({ message: 'Logged out' })
}

const MAX_HISTORY = 5  

module.exports.saveUserSuggestion = async (req, res) => {
  try {
    const userId = req.user._id         
    const suggestion = req.body.suggestion

    if (!suggestion || !suggestion.place_id) {
      return res.status(400).json({ error: 'Invalid suggestion' })
    }

    const user = await userModel.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    const existing = user.searchHistory.find(
      item => item.placeId === suggestion.place_id
    )

    if (existing) {
      existing.count += 1
      existing.lastUsed = new Date()
    } else {
      user.searchHistory.push({
        description: suggestion.description,
        placeId: suggestion.place_id
      })
    }

    user.searchHistory.sort((a, b) => b.count - a.count)
    user.searchHistory = user.searchHistory.slice(0, MAX_HISTORY)

    await user.save()

    res.json({ success: true, searchHistory: user.searchHistory })
  } catch (err) {
    // console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

const express = require("express")
const router = express.Router();
const { body } = require("express-validator")
const captainController = require("../controllers/captain.controller")
const authMiddleware = require("../middlewares/auth.middleware")

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be 3 charachters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 charachters'),
    body('vehical.color').isLength({ min: 3 }).withMessage('Color must be 3 charachters'),
    body('vehical.plate').isLength({ min: 3 }).withMessage('Plate must be 3 charachters'),
    body('vehical.capacity').isInt({ min: 1 }).withMessage('Capacity must be one or more'),
    body('vehical.vehicalType').isIn(['car', 'motercycle', 'auto']).withMessage('Invalid vehical type'),
],
    captainController.registerCaptain
)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 charachters')
],
    captainController.loginCaptain
)

router.get('/profile' , authMiddleware.authCaptain , captainController.getCaptainProfile)

router.get('/logout' , authMiddleware.authCaptain , captainController.logoutCaptain)

module.exports = router
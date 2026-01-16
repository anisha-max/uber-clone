const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be atleast 3 charachters']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be atleast 3 charachters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be atleast 5 charachters']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be atleast 3 charachters']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be atleast 3 charachters']
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, 'Capacity must be atleast 1']
        },
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
})


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema)

module.exports = captainModel
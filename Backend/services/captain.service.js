const captainModel = require('../models/captian.model')

module.exports.createCaptain = async({ firstname, lastname, email, password, color, plate, capacity, vehicalType })=> {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicalType) {
        throw new Error('All fiels are required')
    }

    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehical: {
            color,
            plate,
            capacity,
            vehicalType
        }
    })
    return captain
}
const User = require('../models/user.model')
const asyncHandler = require('../middleware/asyncHandler')
const emailTransporter = require('../services/transporterEmail')
require('dotenv').config();

exports.signUpWithUsernamePassword = asyncHandler (async(req, res) => {

})

exports.signInWithUsernamePassword = asyncHandler (async(req, res) => {

})
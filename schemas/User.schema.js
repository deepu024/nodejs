const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    phoneNumber: {
        type: String,
        required: false,
        optional: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    },
    profilePicture: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);
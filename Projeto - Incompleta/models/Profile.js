const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    bio: { type: String },
    website: { type: String }
});

module.exports = mongoose.model('Profile', ProfileSchema)

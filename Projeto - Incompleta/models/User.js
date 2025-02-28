const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },          // Relacionamento 1:1
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]     // Relacionamento N:N
})

module.exports = mongoose.model('User', UserSchema)

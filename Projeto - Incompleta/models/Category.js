const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Relacionamento N:N
})

module.exports = mongoose.model('Category', CategorySchema)

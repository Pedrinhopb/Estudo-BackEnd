const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },    // Muitos comentários para um post
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }     // Um comentário pertence a um usuário
}, { timestamps: true })

module.exports = mongoose.model('Comment', CommentSchema)

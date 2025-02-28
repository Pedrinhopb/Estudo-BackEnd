const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const { authMiddleware } = require('../middlewares/authMiddleware')             // Middleware para autenticação

// Rotas CRUD de Comentários
router.post('/', authMiddleware, commentController.createComment)               // Criar comentário (Requer login)
router.get('/:postId', commentController.getCommentsByPost)                     // Buscar comentários de um post
router.put('/:id', authMiddleware, commentController.updateComment)             // Atualizar comentário (Requer login)
router.delete('/:id', authMiddleware, commentController.deleteComment)          // Deletar comentário (Requer login)

module.exports = router

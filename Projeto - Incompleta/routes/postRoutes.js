const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const { authMiddleware } = require('../middlewares/authMiddleware')

// Rotas CRUD de Posts
router.post('/', authMiddleware, postController.createPost)        // Criar um post (requer login)
router.get('/', postController.getAllPosts)                        // Buscar todos os posts
router.get('/:id', postController.getPostById)                     // Buscar um post específico
router.put('/:id', authMiddleware, postController.updatePost)      // Atualizar post (requer login)
router.delete('/:id', authMiddleware, postController.deletePost)   // Deletar post (requer login)

module.exports = router

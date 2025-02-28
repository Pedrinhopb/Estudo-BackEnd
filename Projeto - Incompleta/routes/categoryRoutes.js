const express = require('express')
const router = express.Router()
const categoryController = require('../Controllers/categoryController')
const { authMiddleware } = require('../middlewares/authMiddleware')             // Middleware para autenticação

// Rotas CRUD de Categorias
router.post('/', authMiddleware, categoryController.createCategory)             // Criar categoria (Requer login)
router.get('/', categoryController.getAllCategories)                            // Buscar todas as categorias
router.put('/:id', authMiddleware, categoryController.updateCategory)           // Atualizar categoria (Requer login)
router.delete('/:id', authMiddleware, categoryController.deleteCategory)        // Deletar categoria (Requer login)

module.exports = router

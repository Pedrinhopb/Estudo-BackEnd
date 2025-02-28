const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController') // Importa o controlador

// Buscar todos os usuários (Read)
router.get('/', userController.getAllUsers)

// Buscar um usuário por ID (Read)
router.get('/:id', userController.getUserById)

// Atualizar um usuário (Update) - Requer autenticação
router.put('/:id', userController.updateUser)

// Deletar um usuário (Delete) - Requer autenticação
router.delete('/:id', userController.deleteUser)

module.exports = router

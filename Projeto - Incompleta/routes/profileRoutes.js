const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const { authMiddleware } = require('../middlewares/authMiddleware')

// Criar um perfil (protegido)
router.post('/', authMiddleware, profileController.createProfile)

// Buscar um perfil por ID do usuário
router.get('/:userId', profileController.getProfileByUserId)

// Atualizar um perfil (protegido)
router.put('/:userId', authMiddleware, profileController.updateProfile)

// Deletar um perfil (protegido)
router.delete('/:userId', authMiddleware, profileController.deleteProfile)

module.exports = router

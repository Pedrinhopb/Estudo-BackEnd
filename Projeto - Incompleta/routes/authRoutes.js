const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const authController = require('../controllers/authController')     // Verifique se o caminho está correto

router.post('/register', [
    body('name').notEmpty().withMessage('O nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
    body('confirmpassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('As senhas não conferem');
        }
        return true;
    })
], authController.register)                                         // Verifique se essa função existe!

router.post('/login', [
    body('email').isEmail().withMessage('E-mail inválido'),
    body('password').notEmpty().withMessage('A senha é obrigatória')
], authController.login)

module.exports = router

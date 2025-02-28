const { validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) return res.status(422).json({ msg: 'E-mail já cadastrado' })

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({ name, email, password: passwordHash })

    try {
        await user.save()
        res.status(201).json({ msg: 'Usuário criado com sucesso!' })
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor' })
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' })

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(422).json({ msg: 'Senha inválida!' })

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '7d' })

    res.status(200).json({ msg: 'Autenticado com sucesso!', token })
}
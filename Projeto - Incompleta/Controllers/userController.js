const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

// Buscar todos os usuários (Read)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')                         // Exclui a senha na resposta
        res.json(users)
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao buscar usuários', error })
    }
}

// Buscar um único usuário por ID (Read)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')         // Exclui a senha
        if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' })

        res.json(user)
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao buscar usuário', error })
    }
}

// Atualizar um usuário (Update)
exports.updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' })

        if (name) user.name = name
        if (email) user.email = email
        if (password) {
            const salt = await bcrypt.genSalt(12)                                // Um valor aleatório que é adicionado à senha antes da criptografia, tornando cada hash único
            user.password = await bcrypt.hash(password, salt)
        }

        await user.save()
        res.json({ msg: 'Usuário atualizado com sucesso!', user })
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar usuário', error })
    }
}

// Deletar um usuário (Delete)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        // Verifica se o ID é um ObjectId válido do MongoDB
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "ID inválido! O formato do ID está incorreto." })
        }

        // Tenta encontrar o usuário pelo ID
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" })
        }

        // Tenta deletar o usuário e verifica se foi deletado com sucesso
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(500).json({ msg: "Falha ao deletar usuário. Tente novamente." })
        }

        res.json({ msg: "Usuário deletado com sucesso!" })
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);                           // Agora o erro aparecerá no terminal
        res.status(500).json({ msg: "Erro ao deletar usuário", error: error.message })
    }
}
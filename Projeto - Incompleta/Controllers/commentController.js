// Importa o modelo de Comentário
const Comment = require('../models/Comment')

// Criar um novo comentário (Create)
exports.createComment = async (req, res) => {
    const { content, postId, userId } = req.body;

    try {
        // Cria um comentário associando a um post e um usuário
        const comment = new Comment({ content, post: postId, user: userId })
        await comment.save();

        res.status(201).json({ msg: 'Comentário adicionado!', comment })
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao adicionar comentário', error })
    }
}

// Buscar todos os comentários de um post (Read)
exports.getCommentsByPost = async (req, res) => {
    try {
        // Busca comentários de um post específico e popula os dados do usuário
        const comments = await Comment.find({ post: req.params.postId }).populate('user', 'name email')

        if (!comments.length) return res.status(404).json({ msg: 'Nenhum comentário encontrado' })

        res.json(comments)
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao buscar comentários', error })
    }
}

// Atualizar um comentário (Update)
exports.updateComment = async (req, res) => {
    try {
        const { content } = req.body;

        // Procura o comentário pelo ID passado na URL
        const comment = await Comment.findById(req.params.id)
        if (!comment) return res.status(404).json({ msg: 'Comentário não encontrado' })

        // Atualiza o conteúdo do comentário
        comment.content = content
        await comment.save()

        res.json({ msg: 'Comentário atualizado!', comment })
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar comentário', error })
    }
}

// Deletar um comentário (Delete)
exports.deleteComment = async (req, res) => {
    try {
        // Remove o comentário pelo ID
        await Comment.findByIdAndDelete(req.params.id)
        res.json({ msg: 'Comentário deletado com sucesso!' })
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao deletar comentário', error })
    }
}


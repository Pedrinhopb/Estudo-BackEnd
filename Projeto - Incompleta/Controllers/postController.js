const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');

// 📌 Criar um post (Create)
exports.createPost = async (req, res) => {
    const { title, content, authorId } = req.body;

    // 🔹 Exibe no console o que está sendo recebido no body
    console.log("🔍 Dados recebidos no req.body:", req.body);
    
    try {
        // 🔹 Verifica se `authorId` foi enviado e se não é um array
        if (!authorId || Array.isArray(authorId) || authorId.length === 0) {
            return res.status(400).json({ msg: "O ID do autor é obrigatório e deve ser um único valor válido." });
        }

        // 🔹 Verifica se `authorId` é um ObjectId válido do MongoDB
        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(400).json({ msg: "ID do autor inválido!" });
        }

        // 🔹 Verifica se o usuário existe antes de criar o post
        const user = await User.findById(authorId);
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // 🔹 Cria o post no banco de dados
        const post = new Post({ title, content, author: authorId });
        await post.save();

        res.status(201).json({ msg: "Post criado com sucesso!", post });
    } catch (error) {
        console.error("❌ Erro ao criar post:", error);
        res.status(500).json({ msg: "Erro ao criar post", error: error.message });
    }
};


// Buscar todos os posts (Read)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email');   // Traz info do autor
        res.json(posts);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao buscar posts', error });
    }
};

// Buscar um post por ID (Read)
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name email');
        if (!post) return res.status(404).json({ msg: 'Post não encontrado' });

        res.json(post);
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao buscar post', error });
    }
};

// Atualizar um post (Update)
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post não encontrado' });

        if (title) post.title = title;
        if (content) post.content = content;

        await post.save();
        res.json({ msg: 'Post atualizado com sucesso!', post });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar post', error });
    }
};

// Deletar um post (Delete)
exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Post deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao deletar post', error });
    }
};

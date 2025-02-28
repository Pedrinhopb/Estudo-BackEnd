require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db'); // Importando conexão com banco
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const profileRoutes = require('./routes/profileRoutes');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/categories', categoryRoutes);
app.use('/profiles', profileRoutes);

// Porta do servidor
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => console.log('🔥 Servidor rodando na porta 3000! 🚀'));
    })
    .catch(error => console.log(error));
// Importa o modelo de Categoria
const Category = require('../models/Category')

// Criar uma nova categoria (Create)
exports.createCategory = async (req, res) => {
    const { name } = req.body

    try {
        // Cria uma nova categoria com o nome fornecido
        const category = new Category({ name })
        await category.save()

        res.status(201).json({ msg: 'Categoria criada com sucesso!', category })
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao criar categoria', error })
    }
}

// Buscar todas as categorias (Read)
exports.getAllCategories = async (req, res) => {
    try {
        // Busca todas as categorias no banco
        const categories = await Category.find()
        res.json(categories)
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao buscar categorias', error })
    }
}

// Atualizar uma categoria (Update)
exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body

        // Procura a categoria pelo ID passado na URL
        const category = await Category.findById(req.params.id)
        if (!category) return res.status(404).json({ msg: 'Categoria não encontrada' })

        // Atualiza o nome da categoria
        category.name = name
        await category.save()

        res.json({ msg: 'Categoria atualizada com sucesso!', category })
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar categoria', error })
    }
}

// Deletar uma categoria (Delete)
exports.deleteCategory = async (req, res) => {
    try {
        // Remove a categoria pelo ID
        await Category.findByIdAndDelete(req.params.id)
        res.json({ msg: 'Categoria deletada com sucesso!' })
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao deletar categoria', error })
    }
}
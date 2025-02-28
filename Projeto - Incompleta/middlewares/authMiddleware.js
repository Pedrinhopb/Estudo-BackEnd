const jwt = require('jsonwebtoken')

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado! Nenhum token fornecido' })
    }

    try {
        const secret = process.env.SECRET
        const decoded = jwt.verify(token, secret)
        req.userId = decoded.id                                                        // Adiciona o ID do usuário à requisição
        next()
    } catch (error) {
        res.status(403).json({ msg: 'Token inválido!' })
    }
}

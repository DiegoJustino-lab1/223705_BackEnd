const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send({ error: 'Acesso negado. Nenhum token fornecido.' });

    try {
        const decoded = jwt.verify(token, 'secret'); 
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ error: 'Token inválido.' });
    }
}

module.exports = auth;
const jwt = require('jsonwebtoken');

const secret = 'secret'; 

function generateToken(user) {
    return jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
}

function verifyTokenSimple(token) {
    return jwt.verify(token, secret);
}

function verifyTokenMiddleware(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });
}

module.exports = { generateToken, verifyTokenSimple, verifyTokenMiddleware };
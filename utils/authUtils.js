const jwt = require('jsonwebtoken')
const secretKey = require('./jwtToken')

function genaratedToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name
    }
    return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}
function genaretRefreshToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name
    }
    return jwt.sign(payload, secretKey, { expiresIn: '7h' })
}
function verifyToken(token) {
    jwt.verify(token, secretKey)
}

module.exports = { genaratedToken, genaretRefreshToken }
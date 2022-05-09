const jwt = require("jsonwebtoken")

 const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if( err) res.json({isLoggedIn: false, message: 'Failed to Authenticate'})
            else {
                req.user = {}
                req.user.name = decoded.name
                req.user.nonce = decoded.nonce
                next()
            }
            
        })
    } else res.json({isLoggedIn: false})
}

module.exports = verifyJWT
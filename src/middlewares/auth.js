const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).send({
            message: 'Access Denied',
        })
    }
    
    try {
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified
        
        next()
    } catch (error) {
        res.status(400).send({message: "Invalid Token"})
    }
}

exports.authAdmin = (req, res, next) => {
    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
        return res.status(401).send({
            message: 'Access Denied',
        })
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN)
        
        if(verified.role==='admin') {
            req.user = verified
        
            next()
        }else{
            res.status(401).send({message: 'Access Denied'})
        }

    } catch (error) {
        res.status(400).send({message: "Invalid Token"})
    }
}
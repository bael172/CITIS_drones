const jwt = require('jsonwebtoken')

module.exports = function(role1,role2) {
    return function (req,res,next) {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] //Bearer asfasndsgdstgh
            console.log(token)
            if(!token) {
                return res.status(401).json({message:"Не авторизован: отсутствует токен"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded)
            //в decoded выписывается запись из таблицы User которая вычилс-ся по токену
            if(decoded.role == role1 || decoded.role == role2 ) {
                req.user = decoded
                next()
            }
            else return res.status(403).json({message:"У вас нет доступа"})
            

        }
        catch(e) {
            res.status(401).json({message:"Не авторизован: токен отсутствует или устарел"})
        }
    }
}
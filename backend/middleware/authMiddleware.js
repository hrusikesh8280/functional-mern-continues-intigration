const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next) =>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(403).json({message:"please login first"});
    }
    jwt.verify(token,"cicd-mern",(err,user)=>{
        if (err){
            return res.status(403).json({message:"invalid token"})
        }
        req.user = user
        next()

    })
}
module.exports=authMiddleware;
const jwt=require("jsonwebtoken");
const { ADMIN_JWT_SECRET }=require("../config/config")

function adminMiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,ADMIN_JWT_SECRET);
    if(decoded){
        req.userId=decoded.id;
        next()
    }
    else{
        res.status(403).json({
            message:"you are not signed in "
        })
    }
}

module.exports={
    adminMiddleware:adminMiddleware
}
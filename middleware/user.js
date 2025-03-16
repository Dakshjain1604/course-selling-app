const jwt=require("jsonwebtoken");
const { USER_JWT }=require("../config/config")

function userMiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,USER_JWT);

    if(decoded){
        req.userId=decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message:"you are not signed in "
        })
    }

}

module.exports={
    userMiddleware:userMiddleware
}
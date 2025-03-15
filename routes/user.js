const { Router } = require("express");
const{ userModel }= require("../db");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const {USER_JWT}=require("../config/config");
const {userMiddleware}=require("../middleware/user");

userRouter.post("/signup", async function (req, res) {
    const { email, password, firstname, lastname } = req.body;
    // const hashedPassoword = await bcrypt.hash(password, 5);
    await userModel.create({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    })
    res.json({
        message: "sign in sucessful"
    })
});


userRouter.post("/signin",userMiddleware, async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const currentUser = userModel.findOne({
        email: email,
        password:password
    });

    if(currentUser.length==1)
    {
        const token=jwt.sign({
            id:currentUser._id
        },USER_JWT);
        res.json({  
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"invalid creds"
        })
    }
    
});

userRouter.get("/user/purchases", (req, res) => {

})


module.exports = {
    userRouter: userRouter
}
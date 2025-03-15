const {Router}=require("express");
const adminRouter=Router();

const {adminModel, courseModel}=require("../db");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");

const {adminMiddleware}=require("../middleware/admin");

const { ADMIN_JWT_SECRET }=require("../config/config");

adminRouter.post("/signup",async function(req,res){
   const {email,password,firstname,lastname}=req.body;
   const adminUser=await adminModel.create({
        email:email,
        password:password,
        firstname:firstname,
        lastname:lastname    
   });

   res.json({
    message:"Admin user Signed in sucessfully",
    email:email,
    firstname:firstname,
    lastname:lastname
   });


});

adminRouter.post("/signin",adminMiddleware,(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const admin = adminModel.findOne({
        email: email,
        password:password
    });

    if(admin)
    {
        const token=jwt.sign({
            id:admin._id
        },ADMIN_JWT_SECRET);
        res.json({  
            token:token
        })
    }
    else{
        res.status(403).json({
            message:"invalid creds"
        })
    }
})

adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId=req.userId;
    const{title,description,imaheUrl,price,creatorId}=req.body;

    const course=await courseModel.create({
        title:title,
        description:description,
        imaheUrl:imaheUrl,
        price:price,
        creatorId:adminId
    })
})
adminRouter.put("/course",adminMiddleware,async function(req,res){
    res.json({
        message:"signup endpoint"
    })
})

adminRouter.post("course/bulk",adminMiddleware,async function(req,res){
    res.json({
        message:"signup endpoint"
    })
})


module.exports={
    adminRouter:adminRouter
}
require('dotenv').config();
const {Router}=require("express");
const adminRouter=Router();

const {adminModel, courseModel}=require("../db");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const {ADMIN_JWT_SECRET}=require("../config/config");
const {adminMiddleware}=require("../middleware/admin");



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

adminRouter.post("/signin",(req,res)=>{
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

    res.json({
        message:"course created",
        courseId:course._id
    }
    )
})
adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId=req.userId;
    const{title,description,imaheUrl,price,courseId}=req.body;

    const course=await courseModel.updateOne({_id:courseId,creatorId:adminId},{
        title:title,
        description:description,
        imaheUrl:imaheUrl,
        price:price,
        creatorId:adminId
    })
    res.json({
        message:"course updated",
        courseId:course._id
    })
})

adminRouter.post("course/bulk",adminMiddleware,async function(req,res){
    const adminId=req.userId;

    const courses=await courseModel.find({
        creatorId:adminId
    })
    res.json({
        message:"signup endpoint",
        courses
    })
})


module.exports={
    adminRouter:adminRouter
}
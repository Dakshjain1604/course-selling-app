require('dotenv').config();
const {Router}=require("express");
const adminRouter=Router();

const {adminModel, courseModel}=require("../db");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const {ADMIN_JWT_SECRET}=require("../config/config");
const {adminMiddleware}=require("../middleware/admin");
// 67d56c2eb012f9e0e69f3d83


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

adminRouter.post("/signin", async function(req, res) {
    const { email, password} = req.body;

    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const admin = await adminModel.find({
        email: email,
        password: password
    });
    console.log(admin);
    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, ADMIN_JWT_SECRET);

        // Do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

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
    console.log(course);
    res.json({
        message:"course created",
        courseId:course._id
    }
    )
});

adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId=req.userId;
    const{title,description,imageUrl,price,courseId}=req.body;

    const course=await courseModel.updateOne({_id:courseId,creatorId:adminId},{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId
    })
    res.json({
        message:"course updated",
        courseId:course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    const adminId=req.userId;
    const courses=await courseModel.findOne({
        creatorId:adminId
    }) 
    res.json({
        message:"here is a list of your courses",
        courses
    })
})


module.exports={
    adminRouter:adminRouter
}
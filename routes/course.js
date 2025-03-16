const {Router}=require("express");
const {purchaseModel, courseModel}=require("../db");
const CourseRouter=Router();
    CourseRouter.post("/purchase",async function(req,res){
        const userId=req.userId;
        const courseId=req.body.courseId;

        await purchaseModel.create({
            userId,
            courseId
        })

        res.json({
            message:"you have sucessfully bought the course"
        })
    })



    CourseRouter.get("/preview", async function(req,res){
        
        const courses=await courseModel.find({}); 
        
        res.json({
            courses:courses
        })
    })

    
module.exports={
    CourseRouter:CourseRouter
}
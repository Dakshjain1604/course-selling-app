const {Router}=require("express");
const courseModel=require("../db");
const CourseRouter=Router();
    CourseRouter.post("/purchase",function(req,res){
        res.json({
            message:"Signup endpoint"
        })
    })
    CourseRouter.get("/preview",(req,res)=>{
        res.json({
            message:"signup endpoint"
        })
    })
module.exports={
    CourseRouter:CourseRouter
}
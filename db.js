const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://Daksh:uV23T7x5nDYGZMLE@cluster0.lo6gz.mongodb.net/courseSelling-app")
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;


const User=new Schema({
    email:{type:String ,unique:true},
    Password:String,
    firstname:String,
    lastname:String
});

const Admin=new Schema({
    email:{type:String ,unique:true},
    Password:String,
    firstname:String,
    lastname:String
});


const course=new Schema({
    title:String,
    description:String,
    price:Number,
    image:String,
    creatorId:ObjectId
})

const purchase=new Schema({
    courseId:ObjectId,
    userId:ObjectId
})


const userModel= mongoose.model("user",User);
const adminModel= mongoose.model("admin",Admin);
const courseModel= mongoose.model("course",course);
const purchaseModel=mongoose.model("purchase",purchase)

module.exports={userModel,adminModel,courseModel,purchaseModel};

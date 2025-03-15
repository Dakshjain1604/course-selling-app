const express=require("express");
const env=require("dotenv");
const app=express();
app.use(express.json());
const mongoose=require("mongoose");

const {CourseRouter}=require("./routes/course");
const {userRouter}=require("./routes/user")
const {adminRouter}=require("./routes/admin")


app.use("/user",userRouter);
app.use("/course",CourseRouter);
app.use("/admin",adminRouter);

async function main(){
    await mongoose.connect("mongodb+srv://Daksh:uV23T7x5nDYGZMLE@cluster0.lo6gz.mongodb.net/courseSelling-app")
    app.listen(3000);
    console.log("listening on port 3000")
}


main();
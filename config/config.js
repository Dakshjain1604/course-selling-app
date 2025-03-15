require('dotenv').config();
const USER_JWT=process.env.ADMIN_JWT_SECRET;

const ADMIN_JWT_SECRET=process.env.ADMIN_JWT_SECRET;



module.exports={
    USER_JWT,ADMIN_JWT_SECRET
}
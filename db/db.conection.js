import mongoose from "mongoose";

export const DB_connection=async()=>{
   await mongoose.connect(process.env.DB_CONNECTION)
   .then(()=>{console.log("db connected")})
   .catch((error)=>{console.log("connection error",error);
   });
   
}
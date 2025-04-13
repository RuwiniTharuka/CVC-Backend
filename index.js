//console.log("Hello World!");
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
//import Student from './models/student.js';
//import studentRouter from './routs/studentRouter.js';
//import itemRouter from './routs/itemRouter.js';
import userRouter from "./routs/userRouter.js";
//import jwt, { decode } from "jsonwebtoken";
import productRouter from "./routs/productRuter.js";
import verifyJWT from "./middleware/auth.js";
import orderRouter from "./routs/orderRouter.js";
import dotenv from "dotenv";
dotenv.config();
/*let*/
const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to the database");
  })
  .catch(() => {
    console.log("connection failed");
  });
app.use(bodyParser.json());
app.use(verifyJWT);
/*embed auth.js app.use(
  (req,res,next)=>{
      const header=req.header("Authorization");
      if(header != null){
          const token=header.replace("Bearer ","")
          jwt.verify(token,"random456",(err , decoded)=>{
              console.log(decoded)
            if(decode != null){
              req.user=decoded
            }
          })
        
      }
     next()
  }
)*/

// console.log(header);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

/*app.use("/api/student",studentRouter);
app.use("/api/item",itemRouter);
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})
*/
function taskComplete() {
  console.log("Task Completed");
}
//app.listen(3000,taskComplete)

app.get("/", (req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch(() => {
      res.json({
        message: "An error occurred",
      });
    });
});

//get request
app.get("/", (req, res) => {
  // console.log(req.body)undefined
  console.log(req.body); // request show akaraya
  console.log("Get request received");
  res.json({
    message: "Hello World",
  });
});
app.post("/", (req, res) => {
  //saving to the student in to the database
  /* console.log(req.body)
       const studentSchema = new mongoose.Schema({
        name : String,
        age : Number,
        city : String
       })
       const studentModel = mongoose.model("students",studentSchema)*/
  const student = new Student(req.body); //variable:student==>>student model:Student
  student
    .save()
    .then(() => {
      res.json({
        message: "student saved successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "student save failed",
      });
    });
});
//post request
app.post("/", (req, res) => {
  console.log(req.body); // request show akaraya
  console.log("post request received");
  res.json({
    message: "This is a post request",
  });
});
//delete request
app.delete("/", (req, res) => {
  console.log(req.body); // request show akaraya
  console.log("Delete request received");
  res.json({
    message: "This is a delete request",
  });
});
//put request
app.put("/", (req, res) => {
  console.log(req.body); // request show akaraya
  console.log("Put request received");
  res.json({
    message: "This is a put request",
  });
});
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

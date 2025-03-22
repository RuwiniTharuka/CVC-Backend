import express from "express";
import {
  getAllStudents,
  updateStudent,
} from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/", getAllStudents);

studentRouter.put("/", updateStudent);

// studentRouter.delete("/", deleteStudent);
//controller eka ptte nathi  method router eke import krla thiynneth bh ewa ekko comment krnn oni
//nathm ayn krla dann oni

export default studentRouter;
/*const studentRouter=express.Router();

root=/
studentRouter.get("/",(req,res)=>{
    res.json({
        message:"All students"
    })
})

studentRouter.post("/",(req,res)=>{
    res.json({
        message:"Student saved"
    })
})

studentRouter.put("/",(req,res)=>{
    res.json({
        message:"Student updated"
    })
})

studentRouter.delete("/",(req,res)=>{
    res.json({
        message:"Student deleted"
    })
})

export default studentRouter;
*/

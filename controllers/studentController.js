import Student from "../models/student.js" 
export function getAllStudents(req,res){
    Student.find().then(
        (Students)=>{
            res.json(Students)
        }
    ).catch(
        ()=>{
            res.json({
                message:"Error"
            })
        }
    )
}

export function saveAllStudents(req,res){
    const student =new Student(req.body)
    Student.save().then(
        ()=>{
            res.json({
                message:"Student saved"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"Error"
            })
        }
    )
}

export function updateStudent(req,res){
   res.json({
    message:"Student updated"
   })
}
       

/*export function getAllStudents(req,res){
    res.json({
        message:"All students"
    })
}

export function saveStudent(req,res){
    res.json({
        message:"Student saved"
    })
}

export function updateStudent(req,res){
    res.json({
        message:"Student updated"
    })
}

export function deleteStudent(req,res){
    res.json({
        message:"Student deleted"
    })
}*/
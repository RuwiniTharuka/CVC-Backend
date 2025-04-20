import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export function saveUser(req,res){
if(req.body.role=="admin"){
    if(req.user==null){
        res.status(403).json({
            message:"Please login as admin before creating an admin account",
        });
        return;
    }
    if(req.user.role!="admin"){
        res.status(403).json({
            message:"You are not authorized to create an admin account",
        });
        return;
    }
}
    
     //console.log(hashedPassword)
    const hashedPassword=bcrypt.hashSync(req.body.password,10)
    const user=new User({
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:hashedPassword,
        role:req.body.role,
    });
    user.save().then(
        ()=>{
            res.json({
                message:"User saved successfully"
            })
        }).catch(
            (err)=>{
                console.log(err)
                res.status(500).json({
                    message:"User not saved"
                })
            }
        )
}
export function loginUser(req,res){
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({
       email:email
    }).then((user)=>{
      //  console.log(user)
        if(user==null){
            res.status(404).json({
                message:"Invalid email"
            })
        }else{
           const isPasswordCorrect=bcrypt.compareSync(password,user.password);
           //check for user.isdisabled
           //check you invalid attempts
           //if invalid attempts > 3 AND user.blockUntil > Date.now() res.status(403).json({message:"You are blocked"})

           if(isPasswordCorrect){
            
              const userData={
                  email:user.email,
                  firstName:user.firstName,
                  lastName:user.lastName,
                  role:user.role,
                  phone:user.phone,
                  isDisabled:user.isDisabled,
                 isEmailVerified:user.isEmailVerified
              }
              const token=jwt.sign(userData,process.env.JWT_KEY,{
                expiresIn:"48hrs"
              })

              res.json({
                message:"Login successful",
                token:token,
                user:userData,
            });

           }else{
               res.status(403).json({
                   message:"Invalid password"
               });
               //user->blockuntil=Date.now(+5*60*1000)
               //user->save()
               //user->invalidattempts=default=0+1
               //if (user.invalidattempts > 3){
               //user.isdisabled=true

           }
           }
               })
           }
 

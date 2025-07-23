import Student from "../models/student.js"


//    export async function getStudentsSync(req,res){
//     try{
//         const students = await Student.find()
//         res.json(students);

//     }catch(error){
//         res.status(500).json({
//             message:"faild to fetch students",
//             error:error.message
//         })

//     }
//    }
export function createStudents(req,res){
    
    if(req.user == null){
        res.status(403).json(
            {
                message : "Please login to create a user"
            }
        )
        return
    }
    if(req.user.role != "admin"){
        res.status(403).json(
            {
                message : "Please login as an admin to create a student"
            }
        )
        return
    }
   
    const student = new Student(
        {
           name:req.body.name,
           age:req.body.age,
           email:req.body.email 
        }
    )
    student.save().then(
        ()=>{
            res.json(
                {
                    message:"student saved successfully"
                }
            )
        }
    ).catch(
        ()=>{
            console.log("failed to save student")
        }
    )
    
    
}
export function deleteStudents(req,res){
    res.json({
        message:"This is a delete reqest"
    })
    console.log("This is a delete request")
}
export function putStudents(req,res){
    res.json({
        message:"This is a put reqest"
    })
    console.log("This is a put request")
}
import mongoose from "mongoose"
const studentSchema = new mongoose.Schema(      //structure/schema
    {
        name:String,
        age:Number,
        email:String
    }
)
const Student = mongoose.model("students",studentSchema) //connect DB student schema

export default Student;

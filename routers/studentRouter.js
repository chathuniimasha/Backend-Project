import express from "express"
import Student from "../models/student.js"
import  { createStudents, deleteStudents, getStudents, putStudents } from "../controllers/studentController.js"

const studentRouter = express.Router()

studentRouter.get("/",getStudents)
studentRouter.post("/",createStudents)
studentRouter.delete("/",deleteStudents)
studentRouter.put("/",putStudents)
export default studentRouter;
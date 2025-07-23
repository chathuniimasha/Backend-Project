import express from "express" //import the express from node_modules
import mongoose from "mongoose" //import the mongoose from node_modules
import bodyParser from "body-parser" //import the body-parser from node_modules
import Student from "./models/student.js"
import studentRouter from "./routers/studentRouter.js"
import userRouter from "./routers/userRouter.js"
import jwt from "jsonwebtoken"


const app = express()
app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        if(value != null){
            const token = value.replace("Bearer ","")
            jwt.verify(token,"cbc-6503",(err,decoded)=>{
                if(decoded == null){
                    res.status(403).json(
                        {
                            message : "Unauthorozed"
                        }
                    )
                }else{
                    req.user = decoded
                    next()
                }
            }
        )
    }else{
        next()
    }
        
       
    }
)

const connectionString = "mongodb+srv://admin:123@cluster0.krfytza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected")
    }
).catch(
    ()=>{
        console.log("failed to connect to the database")
    }
)




app.use("/students",studentRouter)
app.use("/users",userRouter)



app.listen(5000,()=>{
    console.log("Server started")
})
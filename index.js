import express from "express" //import the express from node_modules
import mongoose from "mongoose" //import the mongoose from node_modules
import bodyParser from "body-parser" //import the body-parser from node_modules
import userRouter from "./routers/userRouter.js"
import jwt from "jsonwebtoken"
import productRouter from "./routers/productRouter.js"
import dotenv from "dotenv"
import cors from "cors"
import orderRouter from "./routers/orderRouter.js"
dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(
    (req,res,next)=>{
        const value = req.header("Authorization")
        //console.log(value)
        if(value != null){
            const token = value.replace("Bearer ","")
            //console.log(token)
            jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                //console.log(decoded)
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

const connectionString = process.env.MONGO_URI
mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected")
    }
).catch(
    ()=>{
        console.log("failed to connect to the database")
    }
)




app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use("/api/orders",orderRouter)


app.listen(5000,()=>{
    console.log("Server started")
})
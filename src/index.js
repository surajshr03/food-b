import express, { json } from 'express';
import cors from "cors";
import {port} from "./constant.js";
import connectToMongoDb from './connectToDb/connectToMongoDb.js';
import userRouter from './router/userRouter.js';
import recipeRouter from './router/recipeRouter.js';
const app = express();

app.use(json());
app.use(cors());

//making statis folder
app.use(express.static("./public"));

app.listen(port,()=>{
    console.log(`Server running in http://localhost:${port}`)
})
connectToMongoDb();

app.use("/users",userRouter)
app.use("/recipe",recipeRouter)
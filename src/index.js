import app from "./app.js"
import dotenv from "dotenv"
import { connectToDb } from "../database.js";
process.on("uncaughtException",err=>{
    console.log(`Error${err.message}`);
    console.log("Due to uncaught exception the server is shuting down");
    server.close(()=>{
        process.exit(1);
    })
})
// setting up confi file
dotenv.config({
    path:'/.env'
});
// connecting to db
connectToDb();
app.get('/health',(req,res)=>{
    res.status(200);
})
const server=app.listen(process.env.PORT,()=>{
    console.log('server is running on port '+process.env.PORT);
    console.log(process.env.COOKIE_EXPIRE_TIME);
})
process.on("unhandledRejection",err=>{
    console.log(`ERROR${err.stack}`);
    console.log("Due to unhandled promise rejection the server is shuting down");
    server.close(()=>{
        process.exit(1);
    })
})
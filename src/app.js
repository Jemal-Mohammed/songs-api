import express from 'express'
import cors from 'cors'
import errorMiddleware from './utils/error.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const app=express();
// apply cors middleware to all routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true,limit: '1024000mb' }));
// create cors options
var corsOptions = {
  origin: ['http://localhost:3000','https://managing-songs-ui.vercel.app/'], // allow only the client origin
  credentials: true // enable credentials for CORS requests
};
app.use(cookieParser());
//  app.use(fileUpload()) 
 dotenv.config({
   path:'config/config.env'
  });
  app.use(cors(corsOptions));


// import all routes
import songs from "./routes/songs.js"
 
app.use("/api",songs);

// Define a health check route
app.get('/health', (req, res) => {
    res.sendStatus(200);
  });
  

// middleware

app.use(errorMiddleware);
// 
export default app;
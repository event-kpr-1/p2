import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
// use defined
import connectDB from './DB/connectDB.js';
import authRoute from './routes/authRoute.js';
import eventRoute from './routes/eventRoute.js'


const app = express();

app.use(express.urlencoded({
    extended : true
}))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

// routes -------------------------------
app.use("/api/admin",authRoute);
app.use("/api/event",eventRoute);


dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT,() => {
    connectDB();
    console.log('port is live : ',PORT);
})
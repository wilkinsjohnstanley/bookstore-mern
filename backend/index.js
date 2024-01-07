import express from "express";
import { PORT } from "./config.js"

const app = express();
app.listen(PORT, ()=>{
    //don't confuse `` for ''
    console.log(`App is listening to port: ${PORT}`);
});
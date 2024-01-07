import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose';
const app = express();

// be careful not to use backslash, use forward slash!!
app.get('/', (request, response)=> {
   console.log(request) 
   return response.status(234).send('Hi mom');
});

//be sur you change directory before npm run dev
mongoose 
    .connect(mongoDBURL)
        .then(()=> {
            console.log('App is connected to the datebase');
            app.listen(PORT, ()=>{
                //don't confuse `` for ''
                console.log(`App is listening to port: ${PORT}`);
            });
        })
        .catch((error)=>{
            console.log(error);
        });

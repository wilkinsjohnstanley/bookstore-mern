import express from 'express';
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';


const app = express();

app.use(express.json());

// be careful not to use backslash, use forward slash!!
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
  });


//Route for Save a red Book
app.post('/books', async (request, response)=>{
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
        return response.status(400).send({
            message:'Send all required fields: title, author, publishYear',
        });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Get All Books from database
app.get('/books', async(request, response)=>{
    try{
        const books = await Book.find({});

        return response.status(200).json(books);
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});




//be sure you change directory before npm run dev
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

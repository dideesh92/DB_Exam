const express = require('express');
const path= require('path');
const mongoose=require('mongoose');
const sample=require('./Models/mylibrary.js')
const dotenv=require('dotenv');

dotenv.config();

const app = express();


const uri=process.env.mongo_uri;
mongoose.connect(uri);

const db=mongoose.connection;
db.on('error',(error)=>{
    console.log(error);
});
db.once("connected",()=>{
    console.log("Connected to database");
})

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'createlibrary.html'))
})

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'))
})

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewlibrary.html'))
})


app.get('/view/:BookID', (req,res) => {
   
    res.sendFile(path.join(__dirname, 'public', 'viewlibrary.html'));
})

app.get('/api/view/:id', async(req,res) => {
    try {
        const id = req.params.id;
        console.log('Searching for book with id:', id);
        const details = await sample.findOne({bookId: id});
        console.log('Query result:', details);
        if (details) {
            res.json(details);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/submit',async (req,res) => {
   try{
    const data=req.body;
    const details=await sample.create(data)
    res.status(201).redirect('/submitted');
   }
   catch(error){
    res.status(500).json
   }
    
})

app.listen(3008, () => {
    console.log("The server is starting")
})


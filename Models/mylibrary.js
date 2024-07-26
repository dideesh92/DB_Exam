const {Schema}=require('mongoose');
const {model}= require('mongoose');


const demo=new Schema({
   
    bookId: { type: String,required: true },
    borrower: { type: String,required: true },
    title: { type: String, required: true },
    dueDate: { type: String, required: true},
    status: { type: String, required: true },
});

const library=model('bookcollection',demo);
module.exports=library;
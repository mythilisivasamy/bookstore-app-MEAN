let express = require("express");
let cors = require("cors");
let bodyparser=require("body-parser");
let mongoose = require("mongoose");
/*
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  */
//----------------------------------
let app=express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

//------------------------------------

let Schema = mongoose.Schema;
let objectId = Schema.ObjectId;
let Book = mongoose.model('booklist',new Schema({
    id : objectId,
    book_title:String,
    book_author:String,
    book_genre:String,
    book_released_date:String,
    book_price:Number
}));

//let uri ="mongodb://localhost:27017/mydatabase";
let uri = process.env.CONNECTIONSTRING;

mongoose.connect(uri,{useNewUrlParser: true , useUnifiedTopology: true})
.then(res=>console.log("success with mongoose"))
.catch(error=> console.log("error: ",error));

//CREATE Document
app.post("/add",(req,res)=>{
    let book=new Book(req.body);
    book.save()
    .then((book)=>{
        res.status(200).json({'message':'book added to db'});
    })
    .catch(err=>{
        console.log("error:",err)
    })
});
//READ
app.get("/books",(req,res)=>{
  Book.find(function(error,books){
        if(error){
            console.log("error: ",error);
        }else{
            res.send(books);
        }
    })
});

app.post("/edit/:id",(req,res)=>{
    Book.findById(req.params.id,(err,book)=>{
        if(err){
             console.log("error on edit",err)
        }else{
            
            book.book_title=req.body.book_title;
            book.book_author=req.body.book_author;
            book.book_genre=req.body.book_genre;
            book.book_released_date=req.body.book_released_date;
            book.book_price=parseInt(req.body.book_price);
            
            book.save()
            .then((book)=>{
                   res.status(200).json({'message':`${book} updated in db`});
            })
            .catch(err=>{
                console.log("error:",err)
            })
        }
    })
});

//DELETE

app.delete("/delete/:id",(req,res)=>{
  Book.findByIdAndRemove({_id:req.params.id},(err,book)=>{
        if(err){console.log("error on id :",err)}
        else{
            res.status(200).json({'message':`${book} is deleted`})
        }
    })
    })

app.listen(3030,()=>{
    console.log("server is running at 3030")
})
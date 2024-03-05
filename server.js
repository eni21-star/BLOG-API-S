const express = require('express');
const app = express()
const port = 3000;





const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://eniolaolagbegi:3dThbH1PUhEpF4jD@nodes.rjnswvt.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to database successfully");
})
.catch(()=>{
  console.log("error while connecting to the database");
})

const schema = new mongoose.Schema({
    blogText: {
        type: String,
        required: true
    },
    blogTitle: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    url: {
        type: String

    }
})

const model =  mongoose.model("myblog", schema);


app.delete('/delete/:id',async (req, res)=>{

    const { id } = req.params; 
   
 
    try {
       const removeData = await model.deleteOne({ blogTitle: id });
       //console.log(removeData);
       if (removeData.deletedCount == 1) {
          res.json({
             message: 1
          });
       }
       else {
          res.json({
             message: 0
          })
       }
    } catch (error) {
       console.log(error.message);
    }
 
 

})


app.put('/edit/:blogTitle', async (req, res) => {

    const body = req.body.blogText;
    console.log(body);
    try {
 
       console.log(typeof body);
       const { blogTitle } = req.params;
 
       const Updated = await model.updateOne({ blogTitle: blogTitle }, { $set: { blogText: body } });
       // console.log(Updated)
       if (Updated.acknowledged && Updated.matchedCount === 1) {
          res.json({
             "message": 1
          })
       }
       else {
          res.json({
             "message": 0
          })
       }
 
    } catch (error) {
       res.status(404).send("internal server error")
       console.log(error.message);
    }
 
 })



app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})
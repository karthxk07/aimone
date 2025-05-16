const mongoose = require('mongoose');


const connectDb = ()=>{
    console.log(process.env.MONGO_URI);    
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("mongodb connected");
    })
}

module.exports = {connectDb};
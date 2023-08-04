const mongoose=require("mongoose");

mongoose.connect(process.env.mongo_url)

const connectionResult=mongoose.connection

connectionResult.on('error',()=>{
    console.log('error connecting to database')
});
connectionResult.on('connected',()=>{
    console.log('Mongo db connected to database')
});

module.exports=connectionResult;
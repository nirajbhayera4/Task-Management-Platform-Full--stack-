const express=require('express');
const cors =require('cors');
const pool = require('./config/db');

require('dotenv').config(); // loads the .env file in process.env by default 

const app=express();
app.use(cors());
app.use(express.json());

app.get('/',(req, res) =>{
    res.send('API is running');
});
const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>
    console.log(`server is running on port ${PORT}`)
);
app.get('/test-db', async(req,res)=>{
    try{
        const result=await pool.query ('SELECT NOW()');
        res.json({
            success:true,
            time:result.rows[0]
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            error:err.message
        });
    }
});

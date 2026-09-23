const express=require('express');
const cors =require('cors');

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
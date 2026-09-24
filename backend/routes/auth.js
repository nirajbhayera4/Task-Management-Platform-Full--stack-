const router=require('express').Router()
const bcrypt=require('bcrypt')
const pool=require('../config/db')

router.post('/signup', async(req,res)=>{
    try{
        const {name, email, password}=req.body;
        const hash=await bcrypt.hash(password,10);
        const result=await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING id, name,email',
            [name, email, hash]
        );
        res.json(result.rows[0]);


    }
    catch(err){
        res.status(500).json({
            error:err.message
        });

    }
});
module.exports=router;

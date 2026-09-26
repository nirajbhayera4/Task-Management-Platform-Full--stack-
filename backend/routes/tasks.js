const router=require('express').Router();
const pool =require('./config/db');
const authMiddleware = require('./middleware/auth');

// get all tasks for loggedd-in user 
router.get('/', authMiddleware, async(req,res)=>{
    try{
        const result=await pool.query(
            'SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at DESC',
            [req.user.id]
        );
        res.json(result.rows);

    }
    catch(err){
        res.status(500).json({
            error: err.message
        });

    }
});


// create a task 
router.post('/',authMiddleware, async(req,res)=>{
    try{
        const {title, description, status}=req.body;
        const result=await pool.query(
            'INSERT INTO tasks(title, description, status, user_id) VALUES ($1,$2,$3,$4) RETURNING*',
            [title, description, status || 'todo', req.user.id]
        );
        res.json(result.rows[0]);
        

    }
    catch(err){
        res.status(500).json({
            error :err.message
        });

    }
});


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

// update the task 
router.put('/', authMiddleware, async(req,res)=>{
    try{
        const {title,description,status}=req.body;
        const result=await pool.query(
            'UPDATE tasks SET title=$1, description=$2, status=$3 WHERE id=$4 AND user_id=$5 RETURNING*', 
            [title, description, status , req.params.id, req.user.id]
        );
        if(result.rows.length===0){
            return res.status(404).json({
                error:'Task not found'
            });
        }
        res.json(result.rows[0]);


    }
    catch(err){
        res.status(500).json({
            error:err.message
        });

    }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *',
      [req.params.id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
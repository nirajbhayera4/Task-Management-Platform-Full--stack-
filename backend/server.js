const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server is running on port ${PORT}`)
);
app.get('/protected', authMiddleware,(req,res)=>{
  res.json({
    message:'You are authenticated!', user:req.user
  });
})
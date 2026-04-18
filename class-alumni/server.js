const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/api/classmates', require('./routes/classmates'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/photos', require('./routes/photos'));
app.use('/api/blessings', require('./routes/blessings'));

// 启动服务
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
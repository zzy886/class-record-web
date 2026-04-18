const express = require('express');
const router = express.Router();
const pool = require('../db');

// 获取留言列表（最新10条）
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 50');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '获取留言失败' });
    }
});

// 发布留言
router.post('/', async (req, res) => {
    const { nickname, content } = req.body;
    if (!nickname || !content) {
        return res.status(400).json({ error: '昵称和内容不能为空' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO messages (nickname, content) VALUES (?, ?)',
            [nickname, content]
        );
        res.json({ id: result.insertId, message: '留言成功' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '留言失败' });
    }
});

module.exports = router;
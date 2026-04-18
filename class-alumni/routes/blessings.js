const express = require('express');
const router = express.Router();
const pool = require('../db');

// 获取所有寄语
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM blessings ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '获取寄语失败' });
    }
});

// 添加寄语
router.post('/', async (req, res) => {
    const { author, content } = req.body;
    if (!author || !content) {
        return res.status(400).json({ error: '作者和内容不能为空' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO blessings (author, content) VALUES (?, ?)',
            [author, content]
        );
        res.json({ id: result.insertId, message: '寄语已添加' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '添加失败' });
    }
});

module.exports = router;
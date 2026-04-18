const express = require('express');
const router = express.Router();
const pool = require('../db');

// 获取所有同学
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM classmates ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 新增同学（可选，用于后台管理）
router.post('/', async (req, res) => {
    const { name, avatar, bio, contact } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO classmates (name, avatar, bio, contact) VALUES (?, ?, ?, ?)',
            [name, avatar, bio, contact]
        );
        res.json({ id: result.insertId, message: '添加成功' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();          // 这一行是关键，不能少
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置 multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const ext = path.extname(file.originalname).toLowerCase();
        const mime = allowedTypes.test(file.mimetype);
        const extValid = allowedTypes.test(ext);
        if (mime && extValid) return cb(null, true);
        cb(new Error('只允许上传图片文件 (jpeg, jpg, png, gif, webp)'));
    }
});

// 获取所有照片
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM photos ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '获取相册失败' });
    }
});

// 上传照片
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: '请选择图片文件' });
    }
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: '标题不能为空' });
    }
    const image_url = '/uploads/' + req.file.filename;
    try {
        const [result] = await pool.query(
            'INSERT INTO photos (title, image_url, description) VALUES (?, ?, ?)',
            [title, image_url, description || '']
        );
        res.json({ id: result.insertId, image_url, message: '上传成功' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '保存失败' });
    }
});

module.exports = router;
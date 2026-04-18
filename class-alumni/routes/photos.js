const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保 uploads 目录存在
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, unique + path.extname(file.originalname));
    }
});
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif|webp/;
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, allowed.test(ext));
    }
});

// POST /api/photos 上传图片并保存记录
router.post('/', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const image_url = '/uploads/' + req.file.filename;
    try {
        const [result] = await pool.query(
            'INSERT INTO photos (title, image_url, description) VALUES (?, ?, ?)',
            [title, image_url, description]
        );
        res.json({ id: result.insertId, image_url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
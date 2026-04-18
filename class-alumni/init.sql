-- 创建数据库（根据实际情况修改名称）
CREATE DATABASE IF NOT EXISTS class_alumni DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE class_alumni;

-- 同学信息表
CREATE TABLE classmates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    avatar VARCHAR(255) DEFAULT '/default-avatar.png',
    bio TEXT,
    contact VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 留言表
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 相册表
CREATE TABLE photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 毕业寄语表
CREATE TABLE blessings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入示例数据（可选）
INSERT INTO classmates (name, avatar, bio, contact) VALUES
('张三', '/uploads/avatar1.jpg', '班长，热爱编程', 'zhangsan@example.com'),
('李四', '/uploads/avatar2.jpg', '文艺委员，喜欢画画', 'lisi@example.com');
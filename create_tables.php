<?php
include 'db.php';

// Create hero table
$sql = "CREATE TABLE IF NOT EXISTS hero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL
)";
$pdo->exec($sql);

// Create about table
$sql = "CREATE TABLE IF NOT EXISTS about (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL
)";
$pdo->exec($sql);

// Insert default data for hero
$sql = "INSERT INTO hero (name, title, description, image) VALUES
    ('Hi, Yedunandan Nambiar Here!', 'Data Analyst', 'Welcome to My Portfolio', 'images/yedu-portfolio.jpg')
    ON DUPLICATE KEY UPDATE name=VALUES(name), title=VALUES(title), description=VALUES(description), image=VALUES(image)";
$pdo->exec($sql);

// Insert default data for about
$sql = "INSERT INTO about (content) VALUES
    ('I am a passionate Data Analyst with a strong interest in transforming raw data into actionable insights. I specialize in data visualization, statistical analysis, and solving real-world problems using tools like SQL, Python, and Excel. With a detail-oriented mindset, I enjoy uncovering patterns and trends that help businesses make informed decisions. I\'m constantly learning new techniques to enhance my analytical skills and contribute to impactful projects. My goal is to use data-driven strategies to create value and support growth.')
    ON DUPLICATE KEY UPDATE content=VALUES(content)";
$pdo->exec($sql);

echo "Tables created and default data inserted successfully!";
?>

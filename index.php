<?php
include 'db.php';

function readCSV($filename) {
    $data = [];
    if (($handle = fopen($filename, "r")) !== FALSE) {
        $headers = fgetcsv($handle, 1000, ",");
        while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
            if (count($headers) == count($row)) {
                $data[] = array_combine($headers, $row);
            }
        }
        fclose($handle);
    }
    return $data;
}

$skills = readCSV('csv/skills.csv');
$projects = readCSV('csv/projects.csv');

// Fetch hero data from database
$hero = [];
try {
    $stmt = $pdo->query("SELECT * FROM hero LIMIT 1");
    $hero = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Fallback to default if DB fails
    $hero = [
        'name' => 'Hi, Yedunandan Nambiar Here!',
        'title' => 'Data Analyst',
        'description' => 'Welcome to My Portfolio',
        'image' => 'images/yedu-portfolio.jpg'
    ];
}

// Check if hero data was fetched successfully, otherwise use default
if (!$hero) {
    $hero = [
        'name' => 'Hi, Yedunandan Nambiar Here!',
        'title' => 'Data Analyst',
        'description' => 'Welcome to My Portfolio',
        'image' => 'images/yedu-portfolio.jpg'
    ];
}

// File path validation: Check if the image file exists, otherwise fallback to default
if (!file_exists($hero['image'])) {
    $hero['image'] = 'images/yedu-portfolio.jpg';
}

// Fetch about data from database
$about = '';
try {
    $stmt = $pdo->query("SELECT * FROM about LIMIT 1");
    $aboutData = $stmt->fetch(PDO::FETCH_ASSOC);
    $about = $aboutData['content'];
} catch (PDOException $e) {
    // Fallback to default if DB fails
    $about = 'I am a passionate Data Analyst with a strong interest in transforming raw data into actionable insights. I specialize in data visualization, statistical analysis, and solving real-world problems using tools like SQL, Python, and Excel. With a detail-oriented mindset, I enjoy uncovering patterns and trends that help businesses make informed decisions. I\'m constantly learning new techniques to enhance my analytical skills and contribute to impactful projects. My goal is to use data-driven strategies to create value and support growth.';
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

<!-- Navigation -->
<nav class="navbar">
  <a href="#home">Home</a>
  <a href="#about">About Me</a>
  <a href="#education">Education</a>
  <a href="#projects">Projects</a>
  <a href="#skills">Skills</a>
  <a href="#contact">Contact</a>
</nav>

<!-- Hero Section -->
<section id="home" class="hero">
  <div class="hero-text">
    <h1><?php echo htmlspecialchars($hero['name']); ?></h1>
    <p><?php echo htmlspecialchars($hero['title']); ?></p>
    <p><?php echo htmlspecialchars($hero['description']); ?></p>
    <a href="cv.pdf" download class="download-btn">
      <i class="fas fa-download"></i>
      Download CV
    </a>
  </div>
  <div class="hero-image">
    <img src="<?php echo htmlspecialchars($hero['image']) . '?v=' . time(); ?>" alt="Profile Photo">
  </div>
</section>

<!-- About -->
<section id="about" class="about">
  <h2>About Me</h2>
  <p><?php echo htmlspecialchars($about); ?></p>

<!-- Education -->
<section id="education" class="education">
  <h2>Education</h2>
  <div class="edu-list">
    <div class="edu-card">
      <h3>B.Tech Information Technology</h3>
      <p><strong>Institution:</strong> Marwadi University</p>
      <p><strong>Year:</strong> 2023 - 2027</p>
      <p><strong>Result:</strong> 8.00 CGPA</p>
    </div>
    <div class="edu-card">
      <h3>12th Grade [CBSE]</h3>
      <p><strong>Institution:</strong> Chinmaya Vidyalaya Kannur</p>
      <p><strong>Year:</strong> 2023</p>
      <p><strong>Result:</strong> 75%</p>
    </div>
    <div class="edu-card">
      <h3>10th Grade [CBSE]</h3>
      <p><strong>Institution:</strong> Kendriya Vidyalaya</p>
      <p><strong>Year:</strong> 2021</p>
      <p><strong>Result:</strong> 85%</p>
    </div>
  </div>
</section>

<!-- Skills -->
<section id="skills" class="skills">
  <h2>Skills</h2>
  <div class="skills-grid">
    <?php foreach ($skills as $skill): ?>
      <div><?php echo htmlspecialchars($skill['Skill']); ?></div>
    <?php endforeach; ?>
  </div>
</section>

<!-- Projects -->
<section id="projects" class="projects">
  <h2>Projects</h2>
  <div class="projects-grid">
    <?php foreach ($projects as $project): ?>
      <div class="project-card">
        <h3><?php echo htmlspecialchars($project['Title']); ?></h3>
        <p><?php echo htmlspecialchars($project['Description']); ?></p>
      </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- Contact -->
<section id="contact" class="contact">
  <h2>Contact</h2>
  <p>Email: yedunandannambiar@gmail.com</p>
  <p>Phone: +91 9876543210</p>

  <!-- Social Icons -->
  <div class="contact-social">

    <a href="https://github.com/yedunandan" target="_blank" class="social-icon">
      <i class="fab fa-github"></i>
    </a>
    <a href="https://www.linkedin.com/in/yedunandan-nambiar-030739348/" target="_blank" class="social-icon">
      <i class="fab fa-linkedin"></i>
    </a>
  </div>
</section>

<!-- Footer -->
<footer class="footer">
  &copy; 2025 Yedunandan Nambiar. All Rights Reserved.
</footer>



</body>
</html>

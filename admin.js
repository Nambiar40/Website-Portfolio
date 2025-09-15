// Check if logged in
if (sessionStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = 'login.html';
}

function loadData() {
  const hero = JSON.parse(localStorage.getItem('hero')) || { name: 'Hi, Yedunandan Nambiar Here!', title: 'Data Analyst', desc: 'Welcome to My Portfolio', image: 'images/yedu-portfolio.jpg' };
  document.getElementById('heroName').value = hero.name;
  document.getElementById('heroTitle').value = hero.title;
  document.getElementById('heroDesc').value = hero.desc;
  document.getElementById('heroImage').value = hero.image;

  const about = localStorage.getItem('about') || 'I am a passionate Data Analyst...';
  document.getElementById('aboutText').value = about;

  const education = JSON.parse(localStorage.getItem('education')) || [
    { degree: 'B.Tech Information Technology', institution: 'Marwadi University', year: '2023 - 2027', result: '8.00 CGPA' },
    { degree: '12th Grade [CBSE]', institution: 'Chinmaya Vidyalaya Kannur', year: '2023', result: '75%' },
    { degree: '10th Grade [CBSE]', institution: 'Kendriya Vidyalaya', year: '2021', result: '85%' }
  ];
  renderEducation(education);

  const skills = JSON.parse(localStorage.getItem('skills')) || ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C++', 'Django', 'SQL', 'Git', 'Excel', 'Tableau', 'Power BI'];
  renderSkills(skills);

  const projects = JSON.parse(localStorage.getItem('projects')) || [
    { title: 'Website Locker', desc: 'A Chrome Extension + Django project...' },
    { title: 'E-Commerce Website', desc: 'A Django-powered online shopping platform...' },
    { title: 'Tatkal Ticket Auto-booker', desc: 'An automation system for booking IRCTC Tatkal tickets...' },
    { title: 'Chat Application', desc: 'A real-time chat app built with Django Channels...' }
  ];
  renderProjects(projects);

  const contact = JSON.parse(localStorage.getItem('contact')) || { email: 'yedunandannambiar@gmail.com', phone: '+91 9876543210', github: 'https://github.com/yedunandan', linkedin: 'https://www.linkedin.com/in/yedunandan-nambiar-030739348/' };
  document.getElementById('contactEmail').value = contact.email;
  document.getElementById('contactPhone').value = contact.phone;
  document.getElementById('contactGithub').value = contact.github;
  document.getElementById('contactLinkedin').value = contact.linkedin;

  // Set all inputs and textareas readonly initially
  setReadonly('hero', true);
  setReadonly('about', true);
  setReadonly('education', true);
  setReadonly('skills', true);
  setReadonly('projects', true);
  setReadonly('contact', true);
}

// Render education list
function renderEducation(education) {
  const list = document.getElementById('educationList');
  list.innerHTML = '';
  education.forEach((edu, index) => {
    const div = document.createElement('div');
    div.className = 'mb-3 border p-3';
    div.innerHTML = `
      <div class="mb-2">
        <label>Degree</label>
        <input type="text" class="form-control" value="${edu.degree}" data-index="${index}" data-field="degree" readonly />
      </div>
      <div class="mb-2">
        <label>Institution</label>
        <input type="text" class="form-control" value="${edu.institution}" data-index="${index}" data-field="institution" readonly />
      </div>
      <div class="mb-2">
        <label>Year</label>
        <input type="text" class="form-control" value="${edu.year}" data-index="${index}" data-field="year" readonly />
      </div>
      <div class="mb-2">
        <label>Result</label>
        <input type="text" class="form-control" value="${edu.result}" data-index="${index}" data-field="result" readonly />
      </div>
      <button type="button" class="btn btn-danger btn-sm" onclick="removeEducation(${index})">Remove</button>
    `;
    list.appendChild(div);
  });
}

// Add education
function addEducation() {
  const education = JSON.parse(localStorage.getItem('education')) || [];
  education.push({ degree: '', institution: '', year: '', result: '' });
  localStorage.setItem('education', JSON.stringify(education));
  renderEducation(education);
}

// Remove education
function removeEducation(index) {
  const education = JSON.parse(localStorage.getItem('education')) || [];
  education.splice(index, 1);
  localStorage.setItem('education', JSON.stringify(education));
  renderEducation(education);
}

// Render projects
function renderProjects(projects) {
  const list = document.getElementById('projectsList');
  list.innerHTML = '';
  projects.forEach((proj, index) => {
    const div = document.createElement('div');
    div.className = 'mb-3 border p-3';
    div.innerHTML = `
      <div class="mb-2">
        <label>Title</label>
        <input type="text" class="form-control" value="${proj.title}" data-index="${index}" data-field="title" readonly />
      </div>
      <div class="mb-2">
        <label>Description</label>
        <textarea class="form-control" rows="3" data-index="${index}" data-field="desc" readonly>${proj.desc}</textarea>
      </div>
      <button type="button" class="btn btn-danger btn-sm" onclick="removeProject(${index})">Remove</button>
    `;
    list.appendChild(div);
  });
}

// Add project
function addProject() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.push({ title: '', desc: '' });
  localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects(projects);
}

// Remove project
function removeProject(index) {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.splice(index, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects(projects);
}

function setReadonly(sectionId, readonly) {
  const form = document.getElementById(sectionId + 'Form');
  if (!form) return;
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    if (readonly) {
      input.setAttribute('readonly', true);
    } else {
      input.removeAttribute('readonly');
    }
  });
}

document.getElementById('heroForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const hero = {
    name: document.getElementById('heroName').value,
    title: document.getElementById('heroTitle').value,
    desc: document.getElementById('heroDesc').value,
    image: document.getElementById('heroImage').value
  };
  localStorage.setItem('hero', JSON.stringify(hero));
  alert('Hero saved!');
  setReadonly('hero', true);
});

document.getElementById('aboutForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const about = document.getElementById('aboutText').value;
  localStorage.setItem('about', about);
  alert('About saved!');
  setReadonly('about', true);
});

document.getElementById('educationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const education = JSON.parse(localStorage.getItem('education')) || [];
  // Update from inputs
  document.querySelectorAll('#educationList input').forEach(input => {
    const index = input.dataset.index;
    const field = input.dataset.field;
    education[index][field] = input.value;
  });
  localStorage.setItem('education', JSON.stringify(education));
  alert('Education saved!');
  setReadonly('education', true);
});

document.getElementById('skillsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const skills = [];
  document.querySelectorAll('#skillsList input').forEach(input => {
    skills.push(input.value);
  });
  localStorage.setItem('skills', JSON.stringify(skills));
  alert('Skills saved!');
  setReadonly('skills', true);
});

document.getElementById('projectsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  // Update from inputs
  document.querySelectorAll('#projectsList input, #projectsList textarea').forEach(input => {
    const index = input.dataset.index;
    const field = input.dataset.field;
    projects[index][field] = input.value;
  });
  localStorage.setItem('projects', JSON.stringify(projects));
  alert('Projects saved!');
  setReadonly('projects', true);
});


document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const contact = {
    email: document.getElementById('contactEmail').value,
    phone: document.getElementById('contactPhone').value,
    github: document.getElementById('contactGithub').value,
    linkedin: document.getElementById('contactLinkedin').value
  };
  localStorage.setItem('contact', JSON.stringify(contact));
  alert('Contact saved!');
  setReadonly('contact', true);
});

function toggleEdit(sectionId) {
  const form = document.getElementById(sectionId + 'Form');
  if (!form) return;
  const inputs = form.querySelectorAll('input, textarea');
  const isReadonly = inputs[0].hasAttribute('readonly');
  if (isReadonly) {
    // Unlocking this section, so lock all others first
    const allSections = ['hero', 'about', 'education', 'skills', 'projects', 'contact'];
    allSections.forEach(sec => {
      if (sec !== sectionId) {
        setReadonly(sec, true);
      }
    });
    // Then unlock this one
    inputs.forEach(input => input.removeAttribute('readonly'));
    // For skills, also enable remove buttons and Add Skill button
    if (sectionId === 'skills') {
      document.querySelectorAll('#skillsList button').forEach(btn => btn.disabled = false);
      const addSkillBtn = form.querySelector('button[onclick="addSkill()"]');
      if (addSkillBtn) addSkillBtn.disabled = false;
    }
    // For education, enable remove buttons and Add Education button
    if (sectionId === 'education') {
      document.querySelectorAll('#educationList button').forEach(btn => btn.disabled = false);
      const addEduBtn = form.querySelector('button[onclick="addEducation()"]');
      if (addEduBtn) addEduBtn.disabled = false;
    }
    // For projects, enable remove buttons and Add Project button
    if (sectionId === 'projects') {
      document.querySelectorAll('#projectsList button').forEach(btn => btn.disabled = false);
      const addProjBtn = form.querySelector('button[onclick="addProject()"]');
      if (addProjBtn) addProjBtn.disabled = false;
    }
  } else {
    // Locking this section
    inputs.forEach(input => input.setAttribute('readonly', true));
    // For skills, disable remove buttons and Add Skill button
    if (sectionId === 'skills') {
      document.querySelectorAll('#skillsList button').forEach(btn => btn.disabled = true);
      const addSkillBtn = form.querySelector('button[onclick="addSkill()"]');
      if (addSkillBtn) addSkillBtn.disabled = true;
    }
    // For education, disable remove buttons and Add Education button
    if (sectionId === 'education') {
      document.querySelectorAll('#educationList button').forEach(btn => btn.disabled = true);
      const addEduBtn = form.querySelector('button[onclick="addEducation()"]');
      if (addEduBtn) addEduBtn.disabled = true;
    }
    // For projects, disable remove buttons and Add Project button
    if (sectionId === 'projects') {
      document.querySelectorAll('#projectsList button').forEach(btn => btn.disabled = true);
      const addProjBtn = form.querySelector('button[onclick="addProject()"]');
      if (addProjBtn) addProjBtn.disabled = true;
    }
  }
}

// Edit education
function editEducation(index) {
  // Removed as per new section-level edit button implementation
}

// Edit project
function editProject(index) {
  // Removed as per new section-level edit button implementation
}

function goBackToSection(sectionId) {
  // Activate the tab corresponding to sectionId
  const tabTrigger = document.querySelector(`#${sectionId}-tab`);
  if (tabTrigger) {
    const tab = new bootstrap.Tab(tabTrigger);
    tab.show();
  }
}

// Logout
function logout() {
  sessionStorage.removeItem('isLoggedIn');
  window.location.href = 'login.html';
}

function resetSections() {
  // Reset skills
  const defaultSkills = ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'C++', 'Django', 'SQL', 'Git', 'Excel', 'Tableau', 'Power BI'];
  localStorage.setItem('skills', JSON.stringify(defaultSkills));
  renderSkills(defaultSkills);

  // Reset education
  const defaultEducation = [
    { degree: 'B.Tech Information Technology', institution: 'Marwadi University', year: '2023 - 2027', result: '8.00 CGPA' },
    { degree: '12th Grade [CBSE]', institution: 'Chinmaya Vidyalaya Kannur', year: '2023', result: '75%' },
    { degree: '10th Grade [CBSE]', institution: 'Kendriya Vidyalaya', year: '2021', result: '85%' }
  ];
  localStorage.setItem('education', JSON.stringify(defaultEducation));
  renderEducation(defaultEducation);

  // Reset projects
  const defaultProjects = [
    { title: 'Website Locker', desc: 'A Chrome Extension + Django project...' },
    { title: 'E-Commerce Website', desc: 'A Django-powered online shopping platform...' },
    { title: 'Tatkal Ticket Auto-booker', desc: 'An automation system for booking IRCTC Tatkal tickets...' },
    { title: 'Chat Application', desc: 'A real-time chat app built with Django Channels...' }
  ];
  localStorage.setItem('projects', JSON.stringify(defaultProjects));
  renderProjects(defaultProjects);

  alert('Skills, Education, and Projects sections have been reset to default.');
}

// Load on page load
loadData();

// Render skills list
function renderSkills(skills) {
  const list = document.getElementById('skillsList');
  list.innerHTML = '';
  skills.forEach((skill, index) => {
    const div = document.createElement('div');
    div.className = 'mb-3 d-flex align-items-center';
    div.innerHTML = `
      <input type="text" class="form-control me-2" value="${skill}" data-index="${index}" readonly />
      <button type="button" class="btn btn-danger btn-sm" onclick="removeSkill(${index})">Remove</button>
    `;
    list.appendChild(div);
  });
}

// Add skill
function addSkill() {
  const skills = JSON.parse(localStorage.getItem('skills')) || [];
  skills.push('');
  localStorage.setItem('skills', JSON.stringify(skills));
  renderSkills(skills);
}

// Remove skill
function removeSkill(index) {
  const skills = JSON.parse(localStorage.getItem('skills')) || [];
  skills.splice(index, 1);
  localStorage.setItem('skills', JSON.stringify(skills));
  renderSkills(skills);
}

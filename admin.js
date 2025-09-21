// Admin Panel JavaScript
let currentSection = 'hero';
let educationItems = [];
let projectItems = [];
let skillsItems = [];
let isAuthenticating = false;

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin panel initializing...');

    // Only check authentication if we're on the admin page, not login page
    if (window.location.pathname.includes('admin.html') || window.location.href.includes('admin.html')) {
        checkAuthentication();
    }
});

// Improved authentication check with loading state
async function checkAuthentication() {
    if (isAuthenticating) {
        console.log('Authentication check already in progress...');
        return;
    }

    isAuthenticating = true;
    console.log('Checking authentication...');

    // Add a small delay to allow localStorage to be properly set
    await new Promise(resolve => setTimeout(resolve, 100));

    if (!isAuthenticated()) {
        console.log('Not authenticated, redirecting to login...');
        // Use replace instead of href to prevent back button issues
        window.location.replace('login.html');
        return;
    }

    console.log('Authentication successful, loading admin panel...');
    isAuthenticating = false;

    // Load existing data
    loadExistingData();

    // Set up navigation
    setupNavigation();

    // Set up forms
    setupForms();

    // Show initial section
    showSection('hero');
}

// Authentication check
function isAuthenticated() {
    return localStorage.getItem('adminAuthenticated') === 'true';
}

// User management functions
function getUsers() {
    const users = localStorage.getItem('adminUsers');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('adminUsers', JSON.stringify(users));
}

function isUsernameAvailable(username) {
    const users = getUsers();
    return !users.some(user => user.username === username);
}

// Login function (called from login.html)
function login(username, password) {
    const users = getUsers();

    // Check if it's the default admin user (backward compatibility)
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('currentUser', 'admin');
        return true;
    }

    // Check registered users
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('currentUser', username);
        return true;
    }

    return false;
}

// Signup function (called from login.html)
function signup(username, password) {
    const users = getUsers();

    // Validate input
    if (!username || !password) {
        return false;
    }

    if (username.length < 3) {
        return false;
    }

    if (password.length < 6) {
        return false;
    }

    // Check if username already exists
    if (!isUsernameAvailable(username)) {
        return false;
    }

    // Create new user
    const newUser = {
        username: username,
        password: password,
        createdAt: new Date().toISOString()
    };

    // Add to users array
    users.push(newUser);

    // Save to localStorage
    saveUsers(users);

    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('adminAuthenticated');
    window.location.href = 'login.html';
}

// Setup navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Show specific section
function showSection(section) {
    currentSection = section;

    // Hide all sections
    const sections = document.querySelectorAll('.section-content');
    sections.forEach(sec => sec.style.display = 'none');

    // Show selected section
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Load section-specific data
    loadSectionData(section);
}

// Setup forms
function setupForms() {
    // Hero form
    const heroForm = document.getElementById('hero-form');
    if (heroForm) {
        heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveHero();
        });
    }

    // About form
    const aboutForm = document.getElementById('about-form');
    if (aboutForm) {
        aboutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAbout();
        });
    }

    // Skills form
    const skillsForm = document.getElementById('skills-form');
    if (skillsForm) {
        skillsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSkills();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveContact();
        });
    }
}

// Load existing data from localStorage
function loadExistingData() {
    try {
        // Load hero data
        const hero = JSON.parse(localStorage.getItem('hero'));
        if (hero) {
            document.getElementById('hero-name').value = hero.name || '';
            document.getElementById('hero-title').value = hero.title || '';
            document.getElementById('hero-desc').value = hero.desc || '';
            document.getElementById('hero-image').value = hero.image || '';
        }

        // Load about data
        const about = localStorage.getItem('about');
        if (about) {
            document.getElementById('about-text').value = about;
        }

        // Load skills data
        const skills = JSON.parse(localStorage.getItem('skills'));
        if (skills && Array.isArray(skills)) {
            skillsItems = skills;
            renderSkillsItems();
        }

        // Load contact data
        const contact = JSON.parse(localStorage.getItem('contact'));
        if (contact) {
            document.getElementById('contact-email').value = contact.email || '';
            document.getElementById('contact-phone').value = contact.phone || '';
            document.getElementById('contact-github').value = contact.github || '';
            document.getElementById('contact-linkedin').value = contact.linkedin || '';
        }

        // Load education data
        const education = JSON.parse(localStorage.getItem('education'));
        console.log('Loaded education data from localStorage:', education);
        if (education && Array.isArray(education)) {
            educationItems = education;
            renderEducationItems();
        }

        // Load projects data
        const projects = JSON.parse(localStorage.getItem('projects'));
        if (projects && Array.isArray(projects)) {
            projectItems = projects;
            renderProjectItems();
        }

        console.log('All data loaded successfully');
    } catch (error) {
        console.warn('Error loading data:', error);
    }
}

// Load section-specific data
function loadSectionData(section) {
    switch(section) {
        case 'education':
            renderEducationItems();
            break;
        case 'projects':
            renderProjectItems();
            break;
    }
}

// Hero section functions
function saveHero() {
    const heroData = {
        name: document.getElementById('hero-name').value,
        title: document.getElementById('hero-title').value,
        desc: document.getElementById('hero-desc').value,
        image: document.getElementById('hero-image').value
    };

    localStorage.setItem('hero', JSON.stringify(heroData));
    showAlert('Hero section saved successfully!', 'success');
}

// About section functions
function saveAbout() {
    const aboutText = document.getElementById('about-text').value;
    localStorage.setItem('about', aboutText);
    showAlert('About section saved successfully!', 'success');
}

// Skills section functions
function saveSkills() {
    const skillsList = document.querySelectorAll('#skills-list input.skill-input');
    const skills = [];
    skillsList.forEach(input => {
        if (input.value.trim() !== '') {
            skills.push(input.value.trim());
        }
    });
    skillsItems = skills;
    localStorage.setItem('skills', JSON.stringify(skillsItems));
    showAlert('Skills section saved successfully!', 'success');
}

// Contact section functions
function saveContact() {
    const contactData = {
        email: document.getElementById('contact-email').value,
        phone: document.getElementById('contact-phone').value,
        github: document.getElementById('contact-github').value,
        linkedin: document.getElementById('contact-linkedin').value
    };

    localStorage.setItem('contact', JSON.stringify(contactData));
    showAlert('Contact section saved successfully!', 'success');
}

// Education functions
function addEducation() {
    const template = document.getElementById('education-template');
    const educationList = document.getElementById('education-list');

    const newItem = template.firstElementChild.cloneNode(true);
    newItem.style.display = 'block';

    // Generate unique ID for this item
    const itemId = 'edu-' + Date.now();
    newItem.setAttribute('data-id', itemId);

    educationList.appendChild(newItem);
    educationItems.push({
        id: itemId,
        degree: '',
        institution: '',
        year: '',
        result: ''
    });
}

function removeEducation(button) {
    const item = button.closest('.education-item');
    const itemId = item.getAttribute('data-id');

    // Remove from array
    educationItems = educationItems.filter(edu => edu.id !== itemId);

    // Remove from DOM
    item.remove();

    // Save to localStorage
    saveEducationData();
}

function renderEducationItems() {
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = '';

    educationItems.forEach((edu, index) => {
        const template = document.getElementById('education-template');
        const newItem = template.firstElementChild.cloneNode(true);
        newItem.style.display = 'block';

        const itemId = edu.id;  // Use actual id from educationItems
        newItem.setAttribute('data-id', itemId);

        // Fill in the data
        const inputs = newItem.querySelectorAll('input');
        if (inputs.length >= 4) {
            inputs[0].value = edu.degree || '';
            inputs[1].value = edu.institution || '';
            inputs[2].value = edu.year || '';
            inputs[3].value = edu.result || '';
        }

        // Add event listeners for real-time saving
        inputs.forEach((input, inputIndex) => {
            input.addEventListener('input', function() {
                const field = ['degree', 'institution', 'year', 'result'][inputIndex];
                educationItems[index][field] = this.value;
                saveEducationData();
            });
        });

        educationList.appendChild(newItem);
    });
}

function saveEducationData() {
    localStorage.setItem('education', JSON.stringify(educationItems));
    showAlert('Education data saved!', 'success');
}

// Project functions
function addProject() {
    const template = document.getElementById('project-template');
    const projectsList = document.getElementById('projects-list');

    const newItem = template.firstElementChild.cloneNode(true);
    newItem.style.display = 'block';

    // Generate unique ID for this item
    const itemId = 'proj-' + Date.now();
    newItem.setAttribute('data-id', itemId);

    projectsList.appendChild(newItem);
    projectItems.push({
        id: itemId,
        title: '',
        desc: ''
    });
}

function removeProject(button) {
    const item = button.closest('.project-item');
    const itemId = item.getAttribute('data-id');

    // Remove from array
    projectItems = projectItems.filter(proj => proj.id !== itemId);

    // Remove from DOM
    item.remove();

    // Save to localStorage
    saveProjectData();
}

function renderProjectItems() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';

    projectItems.forEach((proj, index) => {
        const template = document.getElementById('project-template');
        const newItem = template.firstElementChild.cloneNode(true);
        newItem.style.display = 'block';

        const itemId = 'proj-' + index;
        newItem.setAttribute('data-id', itemId);

        // Fill in the data
        const titleInput = newItem.querySelector('input[type="text"]');
        const descTextarea = newItem.querySelector('textarea');

        if (titleInput) titleInput.value = proj.title || '';
        if (descTextarea) descTextarea.value = proj.desc || '';

        // Add event listeners for real-time saving
        titleInput.addEventListener('input', function() {
            projectItems[index].title = this.value;
            saveProjectData();
        });

        descTextarea.addEventListener('input', function() {
            projectItems[index].desc = this.value;
            saveProjectData();
        });

        projectsList.appendChild(newItem);
    });
}

function saveProjectData() {
    localStorage.setItem('projects', JSON.stringify(projectItems));
    showAlert('Projects data saved!', 'success');
}

// Utility functions
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}

// Skills section functions - render, add, remove
function renderSkillsItems() {
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';

    skillsItems.forEach((skill, index) => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'input-group mb-2';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control skill-input';
        input.value = skill;
        input.placeholder = 'Enter a skill';

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'input-group-append';

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'btn btn-danger';
        removeButton.innerHTML = '<i class="fas fa-trash"></i>';
        removeButton.onclick = () => {
            removeSkill(index);
        };

        buttonDiv.appendChild(removeButton);
        skillDiv.appendChild(input);
        skillDiv.appendChild(buttonDiv);

        skillsList.appendChild(skillDiv);
    });
}

function addSkill() {
    skillsItems.push('');
    renderSkillsItems();
}

function removeSkill(index) {
    skillsItems.splice(index, 1);
    renderSkillsItems();
}

// Make functions available globally
window.login = login;
window.logout = logout;
window.signup = signup;
window.isUsernameAvailable = isUsernameAvailable;
window.addEducation = addEducation;
window.removeEducation = removeEducation;
window.addProject = addProject;
window.removeProject = removeProject;
window.addSkill = addSkill;
window.removeSkill = removeSkill;

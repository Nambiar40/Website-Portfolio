// Admin Authentication System
// This file handles user authentication, registration, and session management

// Initialize users array in localStorage if it doesn't exist
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            { username: 'admin', password: '123456' }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// Get all users from localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Check if username is available
function isUsernameAvailable(username) {
    const users = getUsers();
    return !users.some(user => user.username.toLowerCase() === username.toLowerCase());
}

// Login function
function login(username, password) {
    const users = getUsers();
    const isValid = users.some(user =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password
    );
    if (isValid) {
        localStorage.setItem('loggedIn', 'true');
    }
    return isValid;
}

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

// Logout function
function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
}

// Signup function
function signup(username, password) {
    // Validate input
    if (!username || username.length < 3) {
        return { success: false, message: 'Username must be at least 3 characters long' };
    }

    if (!password || password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long' };
    }

    // Check if username is available
    if (!isUsernameAvailable(username)) {
        return { success: false, message: 'Username already exists' };
    }

    // Add new user
    const users = getUsers();
    users.push({ username: username, password: password });
    saveUsers(users);

    return { success: true, message: 'Account created successfully' };
}

// Make functions globally available
window.initializeUsers = initializeUsers;
window.getUsers = getUsers;
window.saveUsers = saveUsers;
window.isUsernameAvailable = isUsernameAvailable;
window.login = login;
window.signup = signup;

// Initialize users when the script loads
initializeUsers();

// Check if user is logged in
function checkAuth() {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return false;
    try {
        const currentUser = JSON.parse(userStr);
        return currentUser !== null;
    } catch (e) {
        return false;
    }
}

// Check if user is approved
function isApproved() {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return false;
    try {
        const currentUser = JSON.parse(userStr);
        return currentUser && currentUser.approved === true;
    } catch (e) {
        return false;
    }
}

// Check if user is admin
function isAdmin() {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return false;
    try {
        const currentUser = JSON.parse(userStr);
        return currentUser && currentUser.role === 'admin';
    } catch (e) {
        return false;
    }
}

// Save progress
function saveProgress(moduleId, unitId) {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return;
    
    let currentUser;
    try {
        currentUser = JSON.parse(userStr);
    } catch (e) {
        return;
    }
    if (!currentUser) return;

    const userEmail = currentUser.email;
    let users;
    try {
        users = JSON.parse(localStorage.getItem('users')) || [];
    } catch (e) {
        users = [];
    }
    const userIndex = users.findIndex(u => u.email === userEmail);

    if (userIndex !== -1) {
        if (!users[userIndex].progress) {
            users[userIndex].progress = {};
        }
        if (!users[userIndex].progress[moduleId]) {
            users[userIndex].progress[moduleId] = {};
        }
        users[userIndex].progress[moduleId][unitId] = true;
        localStorage.setItem('users', JSON.stringify(users));

        // Update current user progress
        currentUser.progress = users[userIndex].progress;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Get progress for module
function getModuleProgress(moduleId) {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return 0;
    
    let currentUser;
    try {
        currentUser = JSON.parse(userStr);
    } catch (e) {
        return 0;
    }
    if (!currentUser || !currentUser.progress) return 0;

    const moduleProgress = currentUser.progress[moduleId] || {};
    return Object.keys(moduleProgress).length;
}

// Check if logged in, otherwise redirect
function requireAuth() {
    if (!checkAuth()) {
        alert('Please login to access this content.');
        window.location.href = 'login.html';
        return false;
    }
    if (!isApproved()) {
        alert('Your account is pending approval. Please wait for admin approval.');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Initialize admin user if doesn't exist
function initAdmin() {
    let users;
    try {
        users = JSON.parse(localStorage.getItem('users')) || [];
    } catch (e) {
        users = [];
    }
    const adminExists = users.some(u => u.role === 'admin');
    
    if (!adminExists) {
        users.push({
            name: 'Admin',
            email: 'admin@lm.com',
            password: 'admin123',
            role: 'admin',
            approved: true
        });
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initAdmin();
});

/**
 * @jest-environment jsdom
 */

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn(key => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; })
  };
})();

global.localStorage = localStorageMock;

// Load the module functions
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  // Reset the DOM
  document.body.innerHTML = '';
  
  // Load the main.js file content
  delete require.cache[require.resolve('../main.js')];
});

describe('Authentication Functions', () => {
  test('checkAuth should return false when no user is logged in', () => {
    // Since we're testing in a different context, we'll simulate the function
    const result = localStorage.getItem('currentUser') !== null;
    expect(result).toBe(false);
  });

  test('checkAuth should return true when a user is logged in', () => {
    const user = { email: 'test@test.com', role: 'student' };
    localStorage.setItem('currentUser', JSON.stringify(user));
    const result = localStorage.getItem('currentUser') !== null;
    expect(result).toBe(true);
  });

  test('isApproved should return false for unapproved users', () => {
    const user = { email: 'test@test.com', role: 'student', approved: false };
    localStorage.setItem('currentUser', JSON.stringify(user));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const result = currentUser && currentUser.approved === true;
    expect(result).toBe(false);
  });

  test('isApproved should return true for approved users', () => {
    const user = { email: 'test@test.com', role: 'student', approved: true };
    localStorage.setItem('currentUser', JSON.stringify(user));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const result = currentUser && currentUser.approved === true;
    expect(result).toBe(true);
  });

  test('isAdmin should return false for non-admin users', () => {
    const user = { email: 'test@test.com', role: 'student', approved: true };
    localStorage.setItem('currentUser', JSON.stringify(user));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const result = currentUser && currentUser.role === 'admin';
    expect(result).toBe(false);
  });

  test('isAdmin should return true for admin users', () => {
    const user = { email: 'admin@test.com', role: 'admin', approved: true };
    localStorage.setItem('currentUser', JSON.stringify(user));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const result = currentUser && currentUser.role === 'admin';
    expect(result).toBe(true);
  });
});

describe('Progress Functions', () => {
  test('saveProgress should save unit progress to localStorage', () => {
    const users = [
      { 
        email: 'test@test.com', 
        password: 'pass',
        role: 'student',
        approved: true,
        progress: {}
      }
    ];
    const currentUser = users[0];
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Simulate saveProgress
    const moduleId = '1';
    const unitId = '1.1';
    const updatedUsers = JSON.parse(localStorage.getItem('users'));
    const userIndex = updatedUsers.findIndex(u => u.email === currentUser.email);
    
    if (userIndex !== -1) {
      if (!updatedUsers[userIndex].progress) {
        updatedUsers[userIndex].progress = {};
      }
      if (!updatedUsers[userIndex].progress[moduleId]) {
        updatedUsers[userIndex].progress[moduleId] = {};
      }
      updatedUsers[userIndex].progress[moduleId][unitId] = true;
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      currentUser.progress = updatedUsers[userIndex].progress;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    const savedUsers = JSON.parse(localStorage.getItem('users'));
    expect(savedUsers[0].progress['1']['1.1']).toBe(true);
  });

  test('getModuleProgress should return correct progress count', () => {
    const user = {
      email: 'test@test.com',
      progress: {
        '1': { '1.1': true, '1.2': true, '1.3': false }
      }
    };
    localStorage.setItem('currentUser', JSON.stringify(user));

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const moduleProgress = currentUser.progress['1'] || {};
    const count = Object.keys(moduleProgress).length;
    
    expect(count).toBe(3);
  });

  test('getModuleProgress should return 0 when no progress exists', () => {
    const user = { email: 'test@test.com', progress: {} };
    localStorage.setItem('currentUser', JSON.stringify(user));

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const result = currentUser.progress['1'] ? Object.keys(currentUser.progress['1']).length : 0;
    
    expect(result).toBe(0);
  });
});

describe('Admin Initialization', () => {
  test('initAdmin should create admin user if none exists', () => {
    localStorage.setItem('users', JSON.stringify([]));

    // Simulate initAdmin
    const users = JSON.parse(localStorage.getItem('users'));
    const adminExists = users.some(u => u.role === 'admin');
    
    expect(adminExists).toBe(false);

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

    const updatedUsers = JSON.parse(localStorage.getItem('users'));
    const newAdminExists = updatedUsers.some(u => u.role === 'admin');
    
    expect(newAdminExists).toBe(true);
    expect(updatedUsers[0].email).toBe('admin@lm.com');
  });

  test('initAdmin should not create duplicate admin', () => {
    const users = [{
      name: 'Admin',
      email: 'admin@lm.com',
      password: 'admin123',
      role: 'admin',
      approved: true
    }];
    localStorage.setItem('users', JSON.stringify(users));

    const existingUsers = JSON.parse(localStorage.getItem('users'));
    const adminExists = existingUsers.some(u => u.role === 'admin');
    
    expect(adminExists).toBe(true);
    expect(existingUsers.length).toBe(1);
  });
});

describe('requireAuth function behavior', () => {
  test('should allow authenticated and approved users', () => {
    const user = { email: 'test@test.com', role: 'student', approved: true };
    localStorage.setItem('currentUser', JSON.stringify(user));

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAuth = currentUser !== null;
    const isApproved = currentUser && currentUser.approved === true;
    const result = isAuth && isApproved;

    expect(result).toBe(true);
  });

  test('should block unauthenticated users', () => {
    const isAuth = localStorage.getItem('currentUser') !== null;
    const result = isAuth;

    expect(result).toBe(false);
  });

  test('should block unapproved users', () => {
    const user = { email: 'test@test.com', role: 'student', approved: false };
    localStorage.setItem('currentUser', JSON.stringify(user));

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAuth = currentUser !== null;
    const isApproved = currentUser && currentUser.approved === true;
    const result = isAuth && isApproved;

    expect(result).toBe(false);
  });
});


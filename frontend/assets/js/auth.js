// Authentication module

class AuthManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
    }

    // Check if user is logged in
    isAuthenticated() {
        return !!localStorage.getItem('currentUser');
    }

    // Get current user
    getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    // Login
    login(email, password) {
        // Simulate login (in production, this would call the API)
        const user = {
            id: utils.generateId(),
            email: email,
            name: email.split('@')[0],
            shopName: 'My Shop',
            token: 'demo-token-' + utils.generateId()
        };

        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', user.token);
        this.currentUser = user;

        return Promise.resolve(user);
    }

    // Register
    register(userData) {
        // Simulate registration
        const user = {
            id: utils.generateId(),
            ...userData,
            token: 'demo-token-' + utils.generateId()
        };

        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authToken', user.token);
        this.currentUser = user;

        return Promise.resolve(user);
    }

    // Logout
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        this.currentUser = null;
        window.location.href = '/frontend/pages/login.html';
    }

    // Check authentication on protected pages
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/frontend/pages/login.html';
            return false;
        }
        return true;
    }

    // Get auth token
    getToken() {
        return localStorage.getItem('authToken');
    }
}

// Create global auth instance
window.auth = new AuthManager();
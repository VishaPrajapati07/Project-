// User Authentication Module
const auth = {
    currentUser: null,

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        }

        // Event Listeners
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        document.getElementById('register-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.showRegistrationForm();
        });

        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
    },

    login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Get users from local storage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Reset nutrition log when logging in as a different user
            if (window.nutrition) {
                nutrition.resetDailyLog();
            }
            this.showDashboard();
        } else {
            alert('Invalid username or password');
        }
    },

    register(username, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.some(u => u.username === username)) {
            alert('Username already exists');
            return false;
        }

        const newUser = {
            username,
            password,
            goals: {
                calories: 2000,
                protein: 150,
                carbs: 250,
                fats: 70
            }
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    },

    logout() {
        // Reset nutrition log before logging out
        if (window.nutrition) {
            nutrition.resetDailyLog();
        }
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showLoginForm();
    },

    showLoginForm() {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('dashboard-section').classList.add('hidden');
    },

    showDashboard() {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard-section').classList.remove('hidden');
        // Trigger dashboard initialization
        if (window.initDashboard) {
            window.initDashboard();
        }
    },

    showRegistrationForm() {
        const username = prompt('Enter username:');
        const password = prompt('Enter password:');

        if (username && password) {
            if (this.register(username, password)) {
                alert('Registration successful! Please login.');
            }
        }
    }
};

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    auth.init();
});
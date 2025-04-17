// Main Application Script
const app = {
    init() {
        // Initialize modules
        this.setupEventListeners();
        this.checkDarkMode();
    },

    setupEventListeners() {
        // Add any global event listeners here
        window.addEventListener('storage', (e) => {
            // Handle storage changes if needed
            if (e.key && e.key.startsWith('nutritionLog_')) {
                if (nutrition && nutrition.loadDailyLog) {
                    nutrition.loadDailyLog();
                }
            }
        });
    },

    checkDarkMode() {
        // Add dark mode support if user prefers it
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
document.getElementById("about-btn").addEventListener("click", () => {
    window.location.href = 'about.html';
});
document.getElementById("member-btn").addEventListener("click", () => {
    window.location.href = 'member.html';
});
document.getElementById("Schedule-btn").addEventListener("click", () => {
    window.location.href = 'Schedule.html';
});
document.getElementById("Gallery-btn").addEventListener("click", () => {
    window.location.href = 'Gallery.html';
});
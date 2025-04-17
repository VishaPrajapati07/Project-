// User Settings Module
const userSettings = {
    init() {
        this.setupGoalEditingUI();
        this.loadUserGoals();
    },

    setupGoalEditingUI() {
        // Add goal editing button to calorie stats
        const calorieStats = document.querySelector('.calorie-stats');
        const editButton = document.createElement('button');
        editButton.id = 'edit-goals-btn';
        editButton.textContent = 'Edit Goals';
        editButton.className = 'edit-goals-button';
        calorieStats.appendChild(editButton);

        // Add event listener for goal editing
        editButton.addEventListener('click', () => this.showGoalEditDialog());
    },

    loadUserGoals() {
        if (auth.currentUser) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const currentUser = users.find(u => u.username === auth.currentUser.username);
            if (currentUser) {
                document.getElementById('calorie-goal').textContent = currentUser.goals.calories;
                // Update the current user's goals in auth module
                auth.currentUser.goals = currentUser.goals;
                // Trigger chart updates
                if (nutrition) {
                    nutrition.updateCharts();
                }
            }
        }
    },

    showGoalEditDialog() {
        const currentGoals = auth.currentUser.goals;
        const newCalories = prompt('Enter your daily calorie goal:', currentGoals.calories);
        const newProtein = prompt('Enter your daily protein goal (grams):', currentGoals.protein);
        const newCarbs = prompt('Enter your daily carbs goal (grams):', currentGoals.carbs);
        const newFats = prompt('Enter your daily fats goal (grams):', currentGoals.fats);

        if (newCalories && newProtein && newCarbs && newFats) {
            this.updateUserGoals({
                calories: parseInt(newCalories),
                protein: parseInt(newProtein),
                carbs: parseInt(newCarbs),
                fats: parseInt(newFats)
            });
        }
    },

    updateUserGoals(newGoals) {
        // Update goals in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === auth.currentUser.username);

        if (userIndex !== -1) {
            users[userIndex].goals = newGoals;
            localStorage.setItem('users', JSON.stringify(users));

            // Update current user goals
            auth.currentUser.goals = newGoals;
            localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));

            // Update UI
            document.getElementById('calorie-goal').textContent = newGoals.calories;
            if (nutrition) {
                nutrition.updateCharts();
            }
        }
    }
};

// Add to window initialization
window.initDashboard = function () {
    nutrition.init();
    userSettings.init();
};
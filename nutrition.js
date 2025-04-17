// Nutrition Tracking Module
const nutrition = {
    smoothies: [
        {
            name: 'Protein Power',
            calories: 300,
            macros: { protein: 30, carbs: 25, fats: 10 },
            goals: ['muscle_gain', 'post_workout']
        },
        {
            name: 'Green Energy',
            calories: 200,
            macros: { protein: 15, carbs: 35, fats: 5 },
            goals: ['weight_loss', 'energy']
        },
        {
            name: 'Berry Blast',
            calories: 250,
            macros: { protein: 20, carbs: 40, fats: 8 },
            goals: ['general_health', 'immunity']
        }
    ],

    dailyLog: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        items: []
    },

    init() {
        this.loadDailyLog();
        this.updateNutritionDisplays();
        this.displaySmoothieRecommendations();
        this.initCharts();
    },

    loadDailyLog() {
        if (!auth.currentUser) return;
        const today = new Date().toDateString();
        const savedLog = localStorage.getItem(`nutritionLog_${auth.currentUser.username}_${today}`);
        if (savedLog) {
            this.dailyLog = JSON.parse(savedLog);
        } else {
            this.resetDailyLog();
        }
    },

    resetDailyLog() {
        this.dailyLog = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            items: []
        };
        this.saveDailyLog();
    },

    saveDailyLog() {
        if (!auth.currentUser) return;
        const today = new Date().toDateString();
        localStorage.setItem(`nutritionLog_${auth.currentUser.username}_${today}`, JSON.stringify(this.dailyLog));
    },

    addItem(item) {
        this.dailyLog.calories += item.calories;
        this.dailyLog.protein += item.macros.protein;
        this.dailyLog.carbs += item.macros.carbs;
        this.dailyLog.fats += item.macros.fats;
        this.dailyLog.items.push(item);

        this.saveDailyLog();
        this.updateNutritionDisplays();
    },

    updateNutritionDisplays() {
        document.getElementById('calories-consumed').textContent = this.dailyLog.calories;
        this.updateCharts();
    },

    displaySmoothieRecommendations() {
        const smoothieList = document.getElementById('smoothie-list');
        smoothieList.innerHTML = '';

        this.smoothies.forEach(smoothie => {
            const smoothieElement = document.createElement('div');
            smoothieElement.innerHTML = `
                <strong>${smoothie.name}</strong><br>
                ${smoothie.calories} calories | P: ${smoothie.macros.protein}g | C: ${smoothie.macros.carbs}g | F: ${smoothie.macros.fats}g
            `;
            smoothieElement.addEventListener('click', () => this.addItem(smoothie));
            smoothieList.appendChild(smoothieElement);
        });
    },

    initCharts() {
        // Calorie Chart
        const calorieCtx = document.getElementById('calorie-chart').getContext('2d');
        this.calorieChart = new Chart(calorieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Consumed', 'Remaining'],
                datasets: [{
                    data: [0, 2000],
                    backgroundColor: ['#4CAF50', '#e0e0e0']
                }]
            },
            options: {
                responsive: true,
                cutout: '70%'
            }
        });

        // Macro Chart
        const macroCtx = document.getElementById('macro-chart').getContext('2d');
        this.macroChart = new Chart(macroCtx, {
            type: 'bar',
            data: {
                labels: ['Protein', 'Carbs', 'Fats'],
                datasets: [{
                    label: 'Grams',
                    data: [0, 0, 0],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },

    updateCharts() {
        if (this.calorieChart && this.macroChart) {
            // Update calorie chart
            const calorieGoal = auth.currentUser.goals.calories;
            const remaining = Math.max(0, calorieGoal - this.dailyLog.calories);
            this.calorieChart.data.datasets[0].data = [this.dailyLog.calories, remaining];
            this.calorieChart.update();

            // Update macro chart
            this.macroChart.data.datasets[0].data = [
                this.dailyLog.protein,
                this.dailyLog.carbs,
                this.dailyLog.fats
            ];
            this.macroChart.update();
        }
    }
};

// Add to window initialization
window.initDashboard = function () {
    nutrition.init();
};
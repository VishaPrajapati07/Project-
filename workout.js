// Workout Module
const workout = {
    exercises: {
        beginner: [
            { name: 'Bodyweight Squats', sets: 3, reps: 10 },
            { name: 'Push-ups', sets: 3, reps: 5 },
            { name: 'Walking Lunges', sets: 2, reps: 10 },
            { name: 'Plank', sets: 3, duration: '30 seconds' }
        ],
        intermediate: [
            { name: 'Jump Squats', sets: 4, reps: 15 },
            { name: 'Push-ups', sets: 3, reps: 15 },
            { name: 'Burpees', sets: 3, reps: 10 },
            { name: 'Mountain Climbers', sets: 3, duration: '45 seconds' }
        ],
        advanced: [
            { name: 'Plyometric Lunges', sets: 4, reps: 20 },
            { name: 'Diamond Push-ups', sets: 4, reps: 20 },
            { name: 'Burpee Pull-ups', sets: 3, reps: 10 },
            { name: 'Plank to Downward Dog', sets: 3, reps: 15 }
        ]
    },

    init() {
        this.displayDailyWorkout();
    },

    getRandomWorkout(level) {
        const exercises = this.exercises[level];
        return exercises.sort(() => Math.random() - 0.5).slice(0, 3);
    },

    displayDailyWorkout() {
        const workoutPlan = document.getElementById('workout-plan');
        // For demo purposes, using intermediate level
        const todaysWorkout = this.getRandomWorkout('intermediate');

        workoutPlan.innerHTML = '';
        todaysWorkout.forEach(exercise => {
            const exerciseElement = document.createElement('div');
            exerciseElement.innerHTML = `
                <strong>${exercise.name}</strong><br>
                ${exercise.sets} sets × ${exercise.reps || exercise.duration}
            `;
            workoutPlan.appendChild(exerciseElement);
        });
    }
};

// Add to window initialization
const originalInit = window.initDashboard;
window.initDashboard = function () {
    if (originalInit) originalInit();
    workout.init();
};
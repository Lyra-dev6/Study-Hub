let timeLeft = 25 * 60;
let timerId = null;

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('time').innerText = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId) return;
    timerId = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            // TRIGGER STREAK ON FINISH
            updateStreak(); 
            alert("Time's up! Great session.");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

function addTodo() {
    const input = document.getElementById('todo-input');
    if (!input.value) return;
    
    const li = document.createElement('li');
    li.style = "list-style: none; margin-bottom: 10px; display: flex; justify-content: space-between;";
    li.innerHTML = `<span>${input.value}</span> <button onclick="this.parentElement.remove()" style="color: red; background: none; border: none; cursor: pointer;">Done</button>`;
    
    document.getElementById('task-list').appendChild(li);
    input.value = "";
}

function getQuote() {
    const quotes = [
        "Focus on being productive, not busy.",
        "Don't stop until you're proud.",
        "Success is the sum of small efforts repeated.",
        "Your future self will thank you."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').innerText = `"${randomQuote}"`;
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('lastStudyDate');
    let streak = parseInt(localStorage.getItem('studyStreak')) || 0;

    if (lastDate !== today) {
        streak++;
        localStorage.setItem('studyStreak', streak);
        localStorage.setItem('lastStudyDate', today);
        document.getElementById('streak-count').innerText = streak;
        
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Show streak when the user opens the site
window.onload = () => {
    const streak = localStorage.getItem('studyStreak') || 0;
    document.getElementById('streak-count').innerText = streak;
};


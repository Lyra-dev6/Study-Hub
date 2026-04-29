let timeLeft = 25 * 60;
let timerId = null;

const sessionsGoal = 4; 

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
            
            updateProgress(); 
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

function updateProgress() {
    let completed = parseInt(localStorage.getItem('sessionsCompleted')) || 0;
    completed++;
    localStorage.setItem('sessionsCompleted', completed);
    
    renderCircle(completed);

    // Still keeps the fun confetti!
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

function renderCircle(completed) {
    const circle = document.querySelector('.progress-circle');
    const percentText = document.querySelector('.absolute.inset-0.flex'); // Grabs the 75% text
    const detailText = document.querySelector('.text-sm.opacity-50'); // Grabs the "Keep going" text

    
    let percentage = Math.min((completed / sessionsGoal) * 100, 100);
    
    const offset = 283 - (percentage / 100 * 283);
    
    circle.style.strokeDashoffset = offset;
    percentText.innerText = `${Math.round(percentage)}%`;
    detailText.innerText = `${completed}/${sessionsGoal} sessions done`;
}

function addTodo() {
    const input = document.getElementById('todo-input');
    if (!input.value) return;
    
    const li = document.createElement('li');
    li.className = "flex justify-between items-center mb-2 bg-white/5 p-2 rounded";
    li.innerHTML = `<span>${input.value}</span> <button onclick="this.parentElement.remove()" class="text-red-400 text-sm hover:text-red-600">Done</button>`;
    
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

window.onload = () => {
    const completed = parseInt(localStorage.getItem('sessionsCompleted')) || 0;
    renderCircle(completed);
};

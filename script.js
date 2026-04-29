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
            alert("Session complete!");
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
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}

function renderCircle(completed) {
    const circle = document.getElementById('circle-bar');
    const percentText = document.getElementById('percent-text');
    const detailText = document.getElementById('progress-detail');
    let percentage = Math.min((completed / sessionsGoal) * 100, 100);
    const offset = 283 - (percentage / 100 * 283);
    if (circle) circle.style.strokeDashoffset = offset;
    if (percentText) percentText.innerText = `${Math.round(percentage)}%`;
    if (detailText) detailText.innerText = `${completed}/${sessionsGoal} sessions done`;
}

function addTodo() {
    const input = document.getElementById('todo-input');
    if (!input.value) return;
    const li = document.createElement('li');
    li.className = "flex justify-between items-center p-2 bg-gray-50 rounded";
    li.innerHTML = `<span>${input.value}</span> <button onclick="this.parentElement.remove()" class="text-red-400 font-bold">✕</button>`;
    document.getElementById('task-list').appendChild(li);
    input.value = "";
}

function getQuote() {
    const quotes = ["Be better than yesterday.", "Focus on your goals.", "Work hard in silence.", "Never give up."];
    document.getElementById('quote').innerText = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
}

window.onload = () => {
    const completed = parseInt(localStorage.getItem('sessionsCompleted')) || 0;
    renderCircle(completed);
};

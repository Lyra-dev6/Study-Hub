// Pomodoro Timer Variables
let timer;
let timeLeft = 25 * 60; 
let isRunning = false;

// DOM Elements
const timeDisplay = document.getElementById('time');
const startBtn = document.querySelector('.buttons button:nth-child(1)');
const pauseBtn = document.querySelector('.buttons button:nth-child(2)');
const resetBtn = document.querySelector('.buttons button:nth-child(3)');

const taskInput = document.querySelector('#todo-card input');
const addBtn = document.querySelector('#todo-card button');
const taskList = document.getElementById('task-list');

const quoteDisplay = document.getElementById('quote');
const newQuoteBtn = document.querySelector('#quotes-card button');

// Pomodoro Timer Functions
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Pomodoro session complete!');
                resetTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    updateDisplay();
}

// Event Listeners for Timer
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// To-do List Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });
        
        li.appendChild(removeBtn);
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

// Event Listener for To-do
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "You miss 100% of the shots you don't take. – Wayne Gretzky",
    "The best way to predict the future is to create it. – Peter Drucker",
    "Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman",
    "The only limit to our realization of tomorrow will be our doubts of today. – Franklin D. Roosevelt",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson"
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[randomIndex];
}

// Event Listener for Quotes
newQuoteBtn.addEventListener('click', getRandomQuote);

// Initialize
updateDisplay();
getRandomQuote();

let timer;
let isRunning = false;
let currentMode = 'pomodoro';
const modes = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

document.getElementById('pomodoro').addEventListener('click', () => switchMode('pomodoro'));
document.getElementById('shortBreak').addEventListener('click', () => switchMode('shortBreak'));
document.getElementById('longBreak').addEventListener('click', () => switchMode('longBreak'));
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('addTaskButton').addEventListener('click', addTask);

function switchMode(mode) {
    currentMode = mode;
    clearInterval(timer);
    isRunning = false;
    document.getElementById('timeDisplay').textContent = formatTime(modes[mode]);
    document.getElementById('startButton').textContent = 'START';
}

function startTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startButton').textContent = 'START';
    } else {
        isRunning = true;
        document.getElementById('startButton').textContent = 'STOP';
        let timeLeft = modes[currentMode];
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timeDisplay').textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Time is up!');
                switchMode(currentMode);
            }
        }, 1000);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        document.getElementById('taskList').appendChild(li);
        taskInput.value = '';
    }
}

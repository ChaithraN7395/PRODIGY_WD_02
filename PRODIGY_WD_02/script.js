// script.js
let timer;
let isRunning = false;
let elapsedTime = 0;
let lapStartTime = 0;
let lapTimes = [];  // Array to store lap times (for accurate tracking)

// Get the elements
const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapsContainer = document.getElementById("laps");

// Format time into HH:MM:SS
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Format time interval (time between laps)
function formatInterval(ms, previousLapTime) {
  const interval = ms - previousLapTime;
  return formatTime(interval);
}

// Start the timer
startButton.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    lapStartTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - lapStartTime;
      display.textContent = formatTime(elapsedTime);
    }, 10); // Use 10ms interval for better accuracy
  }
});

// Pause the timer
pauseButton.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
});

// Reset the timer
resetButton.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  lapStartTime = 0;
  lapTimes = []; // Reset lap times
  display.textContent = "00:00:00";
  lapsContainer.innerHTML = "";
});

// Add a lap
startButton.addEventListener("dblclick", () => {
  if (isRunning) {
    const lapTime = elapsedTime;  // Record the time of the current lap
    lapTimes.push(lapTime);  // Store the lap time
    
    const lapTimeText = document.createElement("li");
    const previousLapTime = lapTimes.length > 1 ? lapTimes[lapTimes.length - 2] : 0; // Get previous lap time
    const interval = lapTimes.length > 1 ? formatInterval(lapTime, previousLapTime) : "N/A"; // Calculate lap interval
    
    lapTimeText.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)} (Interval: ${interval})`;
    lapsContainer.appendChild(lapTimeText);
  }
});

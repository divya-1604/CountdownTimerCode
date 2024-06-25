let span = document.getElementsByTagName("span");
let hr = document.getElementById("hours");
let min = document.getElementById("minutes");
let sec = document.getElementById("seconds");
let milliSec = document.getElementById("millisec");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
let reset = document.getElementById("reset");
const lap = document.getElementById("lap");
let timerContainer = document.querySelector(".timer-container");
let lapContainer = document.createElement("div");
lapContainer.classList.add("lap-container");
timerContainer.appendChild(lapContainer);
let timer = false;
let milliseconds = 0,minutes = 0,seconds = 0,hours = 0;
let intervalId;
let lastLapTime = { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
let lapCount = 0;
//how to display the time
function updateDisplay() {
  hr.innerText = String(hours).padStart(2, "0");
  min.innerText = String(minutes).padStart(2, "0");
  sec.innerText = String(seconds).padStart(2, "0");
  milliSec.innerText = String(milliseconds).padStart(2, "0");
}
// increment in time
function add() {
  intervalId = setInterval(() => {
    milliseconds++;
    if (milliseconds >= 100) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    if (hours >= 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 10);
}
//start the watch on the click of the start button
start.addEventListener("click", () => {
  if (!timer) {
    timer = true;
    add();
  }
});
//stop the timer
stop.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  timer = false;
});
//reset the tinmer to 0
reset.addEventListener("click", () => {
  clearInterval(intervalId);
  timer = false;
  milliseconds = 0;
  seconds = 0;
  hours = 0;
  minutes = 0;
  lapCount = 0;
  lastLapTime = { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 };
  lapContainer.innerHTML = "";
  updateDisplay();
});
//lap and difference in the time
lap.addEventListener("click", () => {
  const lapTime = {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds,
  };

  const diffLapTime = {
    hours: lapTime.hours - lastLapTime.hours,
    minutes: lapTime.minutes - lastLapTime.minutes,
    seconds: lapTime.hours - lastLapTime.seconds,
    milliseconds: lapTime.hours - lastLapTime.milliseconds,
  };

  if (diffLapTime.milliseconds < 0) {
    diffLapTime.milliseconds += 100;
    diffLapTime.seconds -= 1;
  }
  if (diffLapTime.seconds < 0) {
    diffLapTime.seconds += 60;
    diffLapTime.minutes -= 1;
  }
  if (diffLapTime.minutes < 0) {
    diffLapTime.minutes += 60;
    diffLapTime.hours -= 1;
  }
  lastLapTime = { ...lapTime };
  const lapElement = document.createElement("div");
  lapElement.classList.add("lap");
  lapElement.innerText = `Lap ${++lapCount}: ${String(lapTime.hours).padStart(
    2,
    "0"
  )}:${String(lapTime.minutes).padStart(2, "0")}:${String(
    lapTime.seconds
  ).padStart(2, "0")}:${String(lapTime.milliseconds).padStart(
    2,
    "0"
  )} (Diff: ${String(diffLapTime.hours).padStart(2, "0")}:${String(
    diffLapTime.minutes
  ).padStart(2, "0")}:${String(diffLapTime.seconds).padStart(2, "0")}:${String(
    diffLapTime.milliseconds
  ).padStart(2, "0")})`;

  lapContainer.appendChild(lapElement);
});

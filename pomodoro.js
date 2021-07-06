const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const inputWork = document.querySelector("#input__work");
const inputPause = document.querySelector("#input__pause");

const setTimers = document.querySelectorAll('input[type="number"]');

let WORKTIMING = 900;
let PAUSETIMING = 300;

let workTimer = WORKTIMING;
let pauseTimer = PAUSETIMING;
let pause = false;

setTimers.forEach((timer) => {
  timer.addEventListener("change", (e) => {
    if (timer.name === "input__work") {
      WORKTIMING = timer.value * 60;
      page.displayTimerWork(WORKTIMING);
      workTimer = WORKTIMING
    } else {
      PAUSETIMING = timer.value * 60;
      page.displayTimerPause(PAUSETIMING);
      pauseTimer = PAUSETIMING
    }
  });
});

const page = {
  displayTimerWork: function (newTime) {
    newTime = this.calculateMin(newTime);
    document.querySelector(
      ".timer__work__time"
    ).innerHTML = `${newTime[0]}:${newTime[1]}`;
  },
  displayTimerPause: function (newTime) {
    newTime = this.calculateMin(newTime);
    document.querySelector(
      ".timer__pause__time"
    ).innerHTML = `${newTime[0]}:${newTime[1]}`;
  },
  calculateMin: function (newTime) {
    let mod = Math.floor(newTime % 60);
    let min = Math.floor(newTime / 60);
    let sec = mod;
    sec = ("0" + sec).slice(-2);
    return [min, sec];
  },
  changeValueButton: function (text) {
    document.querySelector(".pause").innerHTML = `${text}`;
  },
};

startBtn.addEventListener("click", () => {
  inputWork.setAttribute("disabled", "disabled");
  inputPause.setAttribute("disabled", "disabled");

  pause = false;

  let timer = setInterval(() => {
    if (pause === false && workTimer > 0) {
      workTimer--;
      page.displayTimerWork(workTimer);
    } else if (pause === false && workTimer === 0 && pauseTimer > 0) {
      pauseTimer--;
      page.displayTimerPause(pauseTimer);
    } else if (pause === false && workTimer === 0 && pauseTimer === 0) {
      workTimer = WORKTIMING;
      pauseTimer = PAUSETIMING;
    }
  }, 1000);

  resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    workTimer = WORKTIMING;
    pauseTimer = PAUSETIMING;
    page.displayTimerWork(workTimer);
    page.displayTimerPause(pauseTimer);
    inputWork.removeAttribute("disabled", "disabled");
    inputPause.removeAttribute("disabled", "disabled");
    page.changeValueButton("Pause");
  });
});

pauseBtn.addEventListener("click", () => {
  if (pause === false) {
    pause = true;
    page.changeValueButton("Play");
  } else {
    pause = false;
    page.changeValueButton("Pause");
  }
});

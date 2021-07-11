// const startBtn = document.querySelector(".start");
// const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const btnLaunch = document.querySelector(".btn__launch");
const inputWork = document.querySelector("#input__work");
const inputPause = document.querySelector("#input__pause");

const setTimers = document.querySelectorAll('input[type="number"]');

let WORKTIMING = 12;
let PAUSETIMING = 12;
let timer = null;

let workTimer = WORKTIMING;
let pauseTimer = PAUSETIMING;
let pause = false;
let cycles = 0

setTimers.forEach((timer) => {
  timer.addEventListener("change", (e) => {
    if (timer.name === "input__work") {
      WORKTIMING = timer.value * 60;
      page.displayTimerWork(WORKTIMING);
      workTimer = WORKTIMING;
    } else {
      PAUSETIMING = timer.value * 60;
      page.displayTimerPause(PAUSETIMING);
      pauseTimer = PAUSETIMING;
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
    // sec = ("0" + sec).slice(-2);
    sec = sec.toString().padStart(2, "0")
    return [min, sec];
  },
  changeValueButton: function (text) {
    btnLaunch.innerHTML = `${text}`;
  },
};



btnLaunch.addEventListener("click", () => {
  inputWork.setAttribute("disabled", "disabled");
  inputPause.setAttribute("disabled", "disabled");

  if (timer === null) {
    timer = setInterval(() => {
      if (
        (btnLaunch.innerText === "Commencer" ||
          btnLaunch.innerText === "Pause") &&
        workTimer > 0
      ) {
        workTimer--;
        page.displayTimerWork(workTimer);
      } else if (
        (btnLaunch.innerText === "Commencer" ||
          btnLaunch.innerText === "Pause") &&
        workTimer === 0 &&
        pauseTimer > 0
      ) {
        pauseTimer--;
        page.displayTimerPause(pauseTimer);
      } else if (
        (btnLaunch.innerText === "Commencer" ||
          btnLaunch.innerText === "Pause") &&
        workTimer === 0 &&
        pauseTimer === 0
      ) {
        cycles++;
        document.querySelector("#nbcycles").innerText = cycles
        workTimer = WORKTIMING;
        pauseTimer = PAUSETIMING;
        page.displayTimerPause(pauseTimer);
      }
    }, 1000);
  }

  resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    workTimer = WORKTIMING;
    pauseTimer = PAUSETIMING;
    page.displayTimerWork(workTimer);
    inputWork.removeAttribute("disabled", "disabled");
    inputPause.removeAttribute("disabled", "disabled");
    btnLaunch.innerText = "Commencer";
    timer = null;
    cycles = 0;
  });
});


btnLaunch.addEventListener("click", () => {
  if (btnLaunch.innerText != "Pause") {
    btnLaunch.innerText = "Pause";
  } else if (btnLaunch.innerText === "Pause") {
    btnLaunch.innerText = "Play";
  }
});


// startBtn.addEventListener("click", () => {
//   inputWork.setAttribute("disabled", "disabled");
//   inputPause.setAttribute("disabled", "disabled");

//   pause = false;

//   let timer = setInterval(() => {
//     if (pause === false && workTimer > 0) {
//       workTimer--;
//       page.displayTimerWork(workTimer);
//     } else if (pause === false && workTimer === 0 && pauseTimer > 0) {
//       pauseTimer--;
//       page.displayTimerPause(pauseTimer);
//     } else if (pause === false && workTimer === 0 && pauseTimer === 0) {
//       workTimer = WORKTIMING;
//       pauseTimer = PAUSETIMING;
//     }
//   }, 1000);

//   resetBtn.addEventListener("click", () => {
//     clearInterval(timer);
//     workTimer = WORKTIMING;
//     pauseTimer = PAUSETIMING;
//     page.displayTimerWork(workTimer);
//     page.displayTimerPause(pauseTimer);
//     inputWork.removeAttribute("disabled", "disabled");
//     inputPause.removeAttribute("disabled", "disabled");
//     page.changeValueButton("Pause");
//   });
// });

// pauseBtn.addEventListener("click", () => {
//   if (pause === false) {
//     pause = true;
//     page.changeValueButton("Play");
//   } else {
//     pause = false;
//     page.changeValueButton("Pause");
//   }
// });

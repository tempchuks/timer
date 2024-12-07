const settingsBtn = document.querySelector(".settings-button");
const timeEl = document.getElementById("timer");
const timerContainer = document.querySelector(".timer-container");
const audio = new Audio("../public/cyber-alarms-synthesized-116358.mp3");

////////////////////////////////////////
//// INIT VARIABLES
let bgColor;
let timerColor;
let textColor;
let time;
let id;
const start = document.getElementById("start");
function setTime(minutes = 10) {
  let time = minutes - 1;
  let seconds = 60;
  id = setInterval(() => {
    seconds -= 1;
    if (seconds <= 0) {
      if (time <= 0) {
        audio.play();
        clearInterval(id);
        timeEl.innerHTML = "10:00";
        return;
      }
      time -= 1;
      seconds = 60;
    }

    timeEl.innerHTML = `${time}:${seconds < 10 ? 0 : ""}${seconds}`;
  }, 1000);
}
start.addEventListener("click", () => {
  clearInterval(id);
  setTime(time);
});
settingsBtn.addEventListener("click", () => {
  const html = `<div class="settings-modal">
      <div class="settings-container">
        <div class="settings-box ">
          <div class="input-box">
          <label id="bg-color">Background color</label>
            <input type="color" id="bgcolor-selector" />
          </div>
          <div class="input-box">
            <label id="timer-color">Timer color</label>
            <input type="color" id="timercolor-selector" />
          </div>
          <div class="input-box">
            <label id="minutes">Timer Minutes</label>
            <input type="number" required id="timer-time" />
          </div>
        </div>
      <div class="submit-box"> <button type="submit" class="submit">submit</button></div>
        </div>
    </div>`;
  const app = document.querySelector("#app");
  app.insertAdjacentHTML("afterend", html);

  /////////////////////////////////////////////////
  ////// SELECTORS
  const settingsModal = document.querySelector(".settings-modal");
  const submit = document.querySelector(".submit");
  const timerInput = document.querySelector("#timer-time");
  const bgColorSelector = document.querySelector("#bgcolor-selector");
  const timerColorSelector = document.querySelector("#timercolor-selector");
  settingsModal.addEventListener("click", (e) => {
    const el = e.target.closest(".settings-container");
    if (!el) settingsModal.remove();
  });

  submit.addEventListener("click", (e) => {
    app.style.backgroundColor = bgColorSelector.value;
    timerContainer.style.backgroundColor = timerColorSelector.value;
    time = !timerInput.value ? 10 : timerInput.value;

    if (!id) timeEl.innerHTML = `${!time ? 10 : +time}:00`;
    settingsModal.remove();
  });
});

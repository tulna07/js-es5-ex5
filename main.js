const closeQBtn = document.getElementsByClassName("btn-q-close");
const openQBtn = document.getElementsByClassName("btn-q-open");
const cards = document.getElementsByClassName("card");

for (let i = 0; i < openQBtn.length; ++i) {
  openQBtn[i].onclick = function () {
    openQBtn[i].classList.toggle("btn-q-open--active");

    cards[i].style.display = "block";
  };
}

for (let i = 0; i < closeQBtn.length; ++i) {
  closeQBtn[i].onclick = function () {
    openQBtn[i].classList.toggle("btn-q-open--active");
    cards[i].style.display = "none";
  };
}

// -------------- QUESTION 1 --------------
// Inputs
const benchmark = document.getElementById("benchmark");
const score1 = document.getElementById("score-1");
const score2 = document.getElementById("score-2");
const score3 = document.getElementById("score-3");
const prioritizedArea = document.getElementById("prioritized-area");
const prioritizedObject = document.getElementById("prioritized-object");

// Notifications
const benchmarchNoti = document.getElementById("noti-benchmark");
const score1Noti = document.getElementById("noti-score-1");
const score2Noti = document.getElementById("noti-score-2");
const score3Noti = document.getElementById("noti-score-3");

// Buttons
const submitQ1Btn = document.getElementById("btn-submit-q1");
const showStepsQ1Btn = document.getElementById("btn-show-steps-q1");

// Output
const q1Result = document.getElementById("result-q1");

const BONUS_AREA_A = 2;
const BONUS_AREA_B = 1;
const BONUS_AREA_C = 0.5;

const BONUS_OBJECT_1 = 2.5;
const BONUS_OBJECT_2 = 1.5;
const BONUS_OBJECT_3 = 1;

const bonusScores = {
  area: {
    X: 0,
    A: BONUS_AREA_A,
    B: BONUS_AREA_B,
    C: BONUS_AREA_C,
  },
  object: {
    0: 0,
    1: BONUS_OBJECT_1,
    2: BONUS_OBJECT_2,
    3: BONUS_OBJECT_3,
  },
};

function isInValidInput(input) {
  // Input must be a number >= 0
  if (!Number.isNaN(input) || input < 0) return false;

  return true;
}

function isPass(benchmark, studentScores, prioritizedArea, prioritizedObject) {
  const totalScore = calcTotalScore(
    studentScores,
    prioritizedArea,
    prioritizedObject
  );
  if (
    totalScore >= benchmark &&
    studentScores.score1 > 0 &&
    studentScores.score2 > 0 &&
    studentScores.score3 > 0
  )
    return true;

  return false;
}

function isPriorityArea(selectedOption) {
  if (selectedOption === "X") return false;

  return true;
}

function isPriorityObject(selectedOption) {
  if (selectedOption === "0") return false;

  return true;
}

function calcTotalScore(studentScores, prioritizedArea, prioritizedObject) {
  let result = 0;
  for (let i = 1; i <= 3; ++i) result += studentScores[`score${i}`];

  if (isPriorityArea(prioritizedArea))
    result += bonusScores.area[prioritizedArea];

  if (isPriorityObject(prioritizedObject))
    result += bonusScores.object[prioritizedObject];

  return result;
}

function resetNoti() {
  benchmarchNoti.classList.replace("text-danger", "text-muted");
  score1Noti.classList.replace("text-danger", "text-muted");
  score2Noti.classList.replace("text-danger", "text-muted");
  score3Noti.classList.replace("text-danger", "text-muted");
}

//  onclick event
submitQ1Btn.onclick = function () {
  // Convert input values to number
  const benchmarkVal = +benchmark.value;
  const studentScores = {
    score1: +score1.value,
    score2: +score2.value,
    score3: +score3.value,
  };
  const prioritizedAreaVal = prioritizedArea.value;
  const prioritizedObjectVal = prioritizedObject.value;

  resetNoti();

  // Check valid input
  // Input must be a number >= 0
  if (isInValidInput(benchmarkVal))
    benchmarchNoti.classList.replace("text-muted", "text-danger");

  if (isInValidInput(studentScores.score1))
    score1Noti.classList.replace("text-muted", "text-danger");

  if (isInValidInput(studentScores.score2))
    score2Noti.classList.replace("text-muted", "text-danger");

  if (isInValidInput(studentScores.score3))
    score3Noti.classList.replace("text-muted", "text-danger");

  if (
    isInValidInput(benchmarkVal) ||
    isInValidInput(studentScores.score1) ||
    isInValidInput(studentScores.score2) ||
    isInValidInput(studentScores.score3)
  ) {
    q1Result.classList.add("alert-danger");
    q1Result.classList.replace("alert-success", "alert-danger");
    q1Result.innerHTML = "Invalid input(s) ❗";
    return;
  }

  const totalScore = calcTotalScore(
    studentScores,
    prioritizedAreaVal[0],
    prioritizedObjectVal[0]
  );
  if (
    isPass(
      benchmarkVal,
      studentScores,
      prioritizedAreaVal[0],
      prioritizedObjectVal[0]
    )
  ) {
    q1Result.classList.add("alert-success");
    q1Result.classList.replace("alert-danger", "alert-success");
    q1Result.innerHTML = `- ✨Congratulations! You've passed.<br>
                          - Your total score: ${totalScore}.`;
    return;
  }

  q1Result.classList.add("alert-danger");
  q1Result.classList.replace("alert-success", "alert-danger");
  q1Result.innerHTML = `- You've failed.<br>
                      - Your total score: ${totalScore}.`;
};

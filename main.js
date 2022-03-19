const closeQBtn = document.getElementsByClassName("btn-q-close");
const openQBtn = document.getElementsByClassName("btn-q-open");
const cards = document.getElementsByClassName("card");

for (let i = 0; i < openQBtn.length; ++i) {
  openQBtn[i].onclick = function () {
    openQBtn[i].classList.add("btn-q-open--active");
    cards[i].style.display = "block";
  };
}

for (let i = 0; i < closeQBtn.length; ++i) {
  closeQBtn[i].onclick = function () {
    openQBtn[i].classList.remove("btn-q-open--active");
    cards[i].style.display = "none";
  };
}

function isInValidInput(input) {
  // Input must be a number >= 0
  if (Number.isNaN(input) || input < 0) return true;

  return false;
}

const stepsBox = document.getElementsByClassName("steps-box");
const closeStepsBoxBtn = document.getElementsByClassName("btn-close-steps-box");
const showStepsBoxBtn = document.getElementsByClassName("btn-show-steps-box");

for (let i = 0; i < showStepsBoxBtn.length; ++i) {
  showStepsBoxBtn[i].onclick = function () {
    stepsBox[i].style.display = "block";
  };

  closeStepsBoxBtn[i].onclick = function () {
    stepsBox[i].style.display = "none";
  };
}

// -------------- QUESTION 1 --------------
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

// Output
const q1Result = document.getElementById("result-q1");

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

// -------------- QUESTION 2 --------------
const FIRST_50KW = 500;
const NEXT_50KW = 650;
const NEXT_100KW = 850;
const NEXT_150KW = 1100;
const REMANING = 1300;

// Money formatting
const vndFormatting = new Intl.NumberFormat("vn-VN").format;

// Inputs
const clientName = document.getElementById("client-name");
const consumedKilowatt = document.getElementById("kilowatt-consumed");

// Notifications
const kilowattNoti = document.getElementById("noti-kilowatt-consumed");

// Buttons
const submitQ2Btn = document.getElementById("btn-submit-q2");
const showStepsQ2Btn = document.getElementById("btn-show-steps-q2");

// Output
const q2Result = document.getElementById("result-q2");
const nameResult = document.getElementById("result-name");
const consumedKilowattResult = document.getElementById(
  "result-consumed-kilowatt"
);
const totalResult = document.getElementById("result-total");
const bill = document.getElementById("bill");

function calcFirst50kw(kilowatt) {
  if (0 <= kilowatt && kilowatt <= 50) return FIRST_50KW * kilowatt;
  return FIRST_50KW * 50;
}

function calcNext50kw(kilowatt) {
  if (51 <= kilowatt && kilowatt <= 100) return NEXT_50KW * (kilowatt - 50);

  if (kilowatt > 100) return NEXT_50KW * 50;

  return 0;
}

function calcNext100kw(kilowatt) {
  if (101 <= kilowatt && kilowatt <= 200) return NEXT_100KW * (kilowatt - 100);

  if (kilowatt > 200) return NEXT_100KW * 100;

  return 0;
}

function calcNext150kw(kilowatt) {
  if (201 <= kilowatt && kilowatt <= 350) return NEXT_150KW * (kilowatt - 200);

  if (kilowatt > 350) return NEXT_150KW * 150;

  return 0;
}

function printBill(consumedKilowatt) {
  bill.style.display = "block";
  q2Result.classList.add("alert-success");
  q2Result.classList.replace("alert-danger", "alert-success");
  kilowattNoti.classList.add("text-muted");

  const totalMoney = caclcTotal(consumedKilowatt);

  q2Result.innerHTML = `${totalMoney}`;
  nameResult.innerHTML = clientName.value;
  consumedKilowattResult.innerHTML = consumedKilowatt;
  totalResult.innerHTML = vndFormatting(totalMoney) + " VND";
}

function calcRemaning(kilowatt) {
  if (kilowatt > 350) return REMANING * (kilowatt - 350);

  return 0;
}

function caclcTotal(consumedKilowatt) {
  return (
    calcFirst50kw(consumedKilowatt) +
    calcNext50kw(consumedKilowatt) +
    calcNext100kw(consumedKilowatt) +
    calcNext150kw(consumedKilowatt) +
    calcRemaning(consumedKilowatt)
  );
}

submitQ2Btn.onclick = function () {
  const consumedKilowattVal = +consumedKilowatt.value;

  if (isInValidInput(consumedKilowattVal)) {
    bill.style.display = "none";
    kilowattNoti.classList.replace("text-muted", "text-danger");
    q2Result.classList.add("alert-danger");
    q2Result.classList.replace("alert-success", "alert-danger");
    q2Result.innerHTML = "Invalid input(s) ❗";
    return;
  }

  printBill(consumedKilowattVal);
};

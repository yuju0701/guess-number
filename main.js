let computerNumber = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.querySelector(".button-reset");
let userInput = document.querySelector("#user-input");
let resultAreaImg = document.querySelector(".main-img");
let resultText = document.querySelector(".result-text");
let chanceArea = document.getElementById("chance-area");
let gameOver = false;
let chances = 3;  // 초기 기회를 3으로 설정
let userValueList = [];
let enteredNumbersArea = document.getElementById('entered-numbers');  // 입력한 숫자들을 보여줄 div
let answerArea = document.getElementById('answer');  // 정답을 보여줄 div

chanceArea.innerHTML = `남은 기회: ${chances}`;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", focusInput);

function pickRandomNumber() {
  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNumber);
  answerArea.textContent = `정답은 ${computerNumber} 입니다!`;  // 정답 표시
}

function play() {
  const userValue = parseInt(userInput.value);
  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "1부터 100 사이의 숫자를 입력 해주세요";
    return;
  }

  if (userValueList.includes(userValue)) {
    resultText.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
    return;
  }

  chances--;
  chanceArea.innerHTML = `남은 기회: ${chances}`;
  userValueList.push(userValue);
  enteredNumbersArea.innerHTML = `입력한 숫자들: ${userValueList.join(', ')}`;

  if (userValue < computerNumber) {
    resultAreaImg.src = "https://media0.giphy.com/media/3ov9jExd1Qbwecoqsg/200.gif";
    resultText.textContent = "Up!!";
    failSound.play();
  } else if (userValue > computerNumber) {
    resultAreaImg.src = "https://media.giphy.com/media/r2puuhrnjG7vy/giphy.gif";
    resultText.textContent = "Down!!";
    failSound.play();
  } else {
    resultAreaImg.src = "https://media1.tenor.com/m/ZWopsXeO7tQAAAAd/clapping-applause.gif";
    resultText.textContent = "정답!!";
    successSound.play();
    gameOver = true;
  }

  if (chances === 0 && userValue !== computerNumber) {
    gameOver = true;
    resultText.textContent = "게임 오버! 다시 도전하세요.";
  }

  if (gameOver === true) {
    playButton.disabled = true;
  }
}

function focusInput() {
  userInput.value = "";
}

function reset() {
  pickRandomNumber();
  userInput.value = "";
  resultAreaImg.src = "https://media1.giphy.com/media/9DinPR8bzFsmf74j9W/giphy.gif";
  resultText.textContent = "죽기 싫다면 맞춰라";
  gameOver = false;
  playButton.disabled = false;
  chances = 3;  // 리셋할 때도 기회를 3으로 설정
  chanceArea.innerHTML = `남은 기회: ${chances}`;
  userValueList = [];
  enteredNumbersArea.innerHTML = "";
  answerArea.textContent = "";  // 정답 초기화
  answerArea.textContent = `정답은 ${computerNumber} 입니다!`;  // 정답 표시
}

pickRandomNumber();

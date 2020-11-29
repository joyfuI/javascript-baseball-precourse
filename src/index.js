export default class BaseballGame {
  // 결과를 반환하는 메소드
  play(computerInputNumbers, userInputNumbers) {
    const ball = this.checkBall(computerInputNumbers, userInputNumbers);
    const strike = this.checkStrike(computerInputNumbers, userInputNumbers);
    if (ball === 0 && strike === 0) {
      return '낫싱';
    }
    let retStr = '';
    if (ball > 0) {
      retStr += `${ball}볼 `;
    }
    if (strike > 0) {
      retStr += `${strike}스트라이크`;
    }
    return retStr;
  }

  // 볼이 몇 개인지 반환하는 메소드
  checkBall(computerInputNumbers, userInputNumbers) {
    let count = 0;
    if (computerInputNumbers[0] === userInputNumbers[1]) {
      count++;
    }
    if (computerInputNumbers[0] === userInputNumbers[2]) {
      count++;
    }
    if (computerInputNumbers[1] === userInputNumbers[0]) {
      count++;
    }
    if (computerInputNumbers[1] === userInputNumbers[2]) {
      count++;
    }
    if (computerInputNumbers[2] === userInputNumbers[0]) {
      count++;
    }
    if (computerInputNumbers[2] === userInputNumbers[1]) {
      count++;
    }
    return count;
  }

  // 스트라이크가 몇 개인지 반환하는 메소드
  checkStrike(computerInputNumbers, userInputNumbers) {
    let count = 0;
    if (computerInputNumbers[0] === userInputNumbers[0]) {
      count++;
    }
    if (computerInputNumbers[1] === userInputNumbers[1]) {
      count++;
    }
    if (computerInputNumbers[2] === userInputNumbers[2]) {
      count++;
    }
    return count;
  }

  // 올바른 입력인지 확인하는 메소드
  checkInput(userInputNumbers) {
    if (
      userInputNumbers.match(/^[1-9]{3}$/) === null
      || userInputNumbers[0] === userInputNumbers[1]
      || userInputNumbers[0] === userInputNumbers[2]
      || userInputNumbers[1] === userInputNumbers[2]
    ) {
      return false;
    }
    return true;
  }
}

const userInput = document.getElementById('user-input');
const submit = document.getElementById('submit');
const result = document.getElementById('result');

const baseballGame = new BaseballGame();

let randomNumber;

onload = startGame;
submit.onclick = clickSubmit;

// 야구 게임 시작 메소드 (UI, 숫자 초기화)
function startGame() {
  userInput.value = '';
  result.innerHTML = '';
  randomNumber = createNumber();
}

// 랜덤 숫자 생성
function createNumber() {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 1000).toString();
  } while (!baseballGame.checkInput(randomNumber));
  return randomNumber;
}

// 확인 버튼 클릭
function clickSubmit() {
  if (!baseballGame.checkInput(userInput.value)) {
    alert('1~9까지의 수를 중복없이 3개를 작성해주세요.');
    return;
  }
  const ret = baseballGame.play(randomNumber, userInput.value);
  if (ret === '3스트라이크') {
    result.innerHTML = '<p>🎉 <b>정답을 맞추셨습니다!</b> 🎉</p>'
                     + '<p>게임을 새로 시작하시겠습니까? '
                     + '<button id="game-restart-button">게임 재시작</button></p>';
    document.getElementById('game-restart-button').onclick = startGame;
  } else {
    result.innerHTML = ret;
  }
}

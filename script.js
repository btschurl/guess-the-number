// GUESS THE GAME v1.0
// BARTEK TSCHURl contact me at kontakt@betee.pl or betee.pl

'use strict';

const numberValue = document.querySelector('#number_value');
const btnGuess = document.querySelector('#btn_guess');
const btnReset = document.querySelector('#btn_reset');
const finalMessage = document.querySelector('#final_message');
const winLoss = document.querySelector('#win_loss');
const msgHello = document.querySelector('#msg_hello');
const regexForMaxValue = /^(0|[1-9]|1[0-9]|20)$/; // regex of max value

let maxValue = 0;
let tries = 1;

const triesMsg = (e) => {
  return e > maxValue / 2 ? 'You did OK...' : 'Excellent job!';
};

do {
  maxValue = parseInt(
    prompt(
      'Enter the last number of the range [1 - x] in which you will guess the number? (where x is max. 20)'
    )
  );
} while (!regexForMaxValue.test(maxValue)); // prompt for max value range

let winningNumber = Math.floor(Math.random() * (maxValue - 1 + 1)) + 1; // generator random number in range

msgHello.textContent = `Enter a value in the box below and try to guess the number... [range 1 - ${maxValue}]`;

function guessNumber(number) {
  if (winningNumber === number) {
    // win situation
    winLoss.classList.add('text_green');
    finalMessage.textContent = `Winning number is ${winningNumber}. It took you ${tries} ${
      tries === 1 ? 'try' : 'tries'
    } to guess the number. ${triesMsg(tries)}`;
    winLoss.textContent = `You've won !!!`;
    numberValue.disabled = true;
    btnGuess.disabled = true;
  } else if (number > maxValue || number < 1) {
    // out of range situation
    winLoss.classList.remove('text_green');
    finalMessage.textContent = `Your number is out of range.`;
    winLoss.textContent = `Use a number in the range and try again.`;
  } else {
    // Wrong number situation
    winLoss.classList.remove('text_green');
    finalMessage.textContent = `Your number is ${number} and it's wrong.`;
    winLoss.textContent = `Try again :(`;
    tries++; // add +1 to tries
  }
}

btnGuess.addEventListener('click', () => {
  // action for GUESS button
  guessNumber(Number(numberValue.value));
});

btnReset.addEventListener('click', () => {
  // action for RESET button
  window.location.reload();
});

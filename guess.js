var secret;
var guesses = 10;
createSecretNum();
function guess() {
  var guess = document.getElementById("guess").value;
  if (isNaN(guess) || guess < 1 || guess > 100) {
    document.getElementById("result").innerHTML =  "Input not valid.";
    }
  else if (guess > secret && guesses > 0) {
    // guess is high, guess again
    guesses--;
    if (guesses == 0) {
        youLose();
    }
    else {
      document.getElementById("result").innerHTML = "Guess is high. You have " + guesses + " remaining.";
    }
  }
  else if (guess < secret && guesses > 0) {
    guesses--;
    if (guesses == 0) {
        youLose();
    }
    else {
      document.getElementById("result").innerHTML = "Guess is low. You have " + guesses + " remaining.";
    }
  }
  else if (guess == secret && guesses > 0) {
    // congratulations
    document.getElementById("result").innerHTML = "Congratulations, you've guessed the secret number! A new secret number has been generated. Guess again!";
    guesses = 10;
    createSecretNum();
  }

}
function createSecretNum() {
  secret = Math.floor(Math.random() * 100) + 1;
}
function youLose() {
  document.getElementById("result").innerHTML = "You lose! No remaining guesses. A new secret number has been generated. Guess again!";
  guesses = 10;
  createSecretNum();
}

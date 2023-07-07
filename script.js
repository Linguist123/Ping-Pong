import Ball from "./Ping-Pong/Ball.js"
import Paddle from "./Ping-Pong/Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
const winningScore = 20; // Define the winning score
const bgMusic = document.getElementById("bg-music");

let lastTime
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, ball.y)
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    )

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

    if (isLose()) handleLose()
  }

  lastTime = time
  window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
  }

  // Check for winning condition
  if (
    parseInt(playerScoreElem.textContent) === winningScore ||
    parseInt(computerScoreElem.textContent) === winningScore
  ) {
    handleWin();
    return; // Exit the function to prevent further game updates
  }

  ball.reset()
  computerPaddle.reset()
}

function handleWin() {
  const playerScore = parseInt(playerScoreElem.textContent);
  const computerScore = parseInt(computerScoreElem.textContent);

  // Determine the winner
  let winner;
  if (playerScore === winningScore) {
    winner = "Player";
  } else {
    winner = "Computer";
  }

  // Display the winner
  alert(`${winner} wins the game!`);

  // Reset the scores
  playerScoreElem.textContent = "0";
  computerScoreElem.textContent = "0";
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})

// Play background music
bgMusic.play();

window.requestAnimationFrame(update)

// Set initial volume
bgMusic.volume = 0.5; // Adjust the value as needed (0.5 represents 50% volume)

// Function to reduce the volume
function reduceVolume() {
  if (bgMusic.volume > 0) {
    bgMusic.volume -= 0.01; // Adjust the decrement value as needed
  }
}

document.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Prevent the default context menu from appearing
  });
  
// Call the reduceVolume() function whenever you want to decrease the volume

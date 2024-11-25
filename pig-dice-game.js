// HTML-element -> variabler 
const playerNameInput = document.getElementById("player-name");
const startGameButton = document.getElementById("start-game");
const rollDiceButton = document.getElementById("roll-dice");
const freezePointsButton = document.getElementById("freeze-points");
const totalScoreDisplay = document.getElementById("total-score");
const roundScoreDisplay = document.getElementById("round-score");
const diceDisplay = document.getElementById("dice-number");
const messageDisplay = document.getElementById("message");
const roundsDisplay = document.getElementById("rounds");
const gameContainer = document.getElementById("game-container");
const gameOverMessage = document.getElementById("game-over-message");
const winnerMessage = document.getElementById("winner-message");
const restartGameButton = document.getElementById("restart-game");
const startSection = document.getElementById("start-section");

// global varibael, nås över allt
const gameState = {
  playerName: "", //namn
  totalScore: 0, //totalpoäng
  roundScore: 0,// omgångens poäng
  rounds: 0 // antal omgångar
};

// Funktion som visar eller döljer olika htmlelement 
function toggleVisibility(element, show = true) {
  element.style.display = show ? "block" : "none";
}

// funktion för att återställa spelet
function resetGame() {
  gameState.totalScore = 0;
  gameState.roundScore = 0;
  gameState.rounds = 0;
  rollDiceButton.disabled = false;
  freezePointsButton.disabled = false;
  diceDisplay.textContent = "Tärning: ";
  messageDisplay.textContent = "Börja kasta tärningen!";
  updateUI(); 
}

// funkttion som uppdaterar gränssnittet 
function updateUI() {
  totalScoreDisplay.textContent = `Total poäng: ${gameState.totalScore}`;
  roundScoreDisplay.textContent = `Omgångens poäng: ${gameState.roundScore}`;
  roundsDisplay.textContent = `Antal omgångar: ${gameState.rounds}`;
}

// Funktion för spelets slut 
function endGame() {
  winnerMessage.textContent = `${gameState.playerName} vann spelet på ${gameState.rounds} omgångar!`;
  toggleVisibility(gameOverMessage, true); //  slutmeddelande
  toggleVisibility(gameContainer, false); 
  toggleVisibility(startSection, false); 
  rollDiceButton.disabled = true; // Inaktiverar knappar
  freezePointsButton.disabled = true;
}

// starta spelet
startGameButton.addEventListener("click", () => {
  gameState.playerName = playerNameInput.value; 
  if (!gameState.playerName) {
    alert("Ange ditt namn!"); // om namn saknas visas meddelande
    return;
  }
  resetGame(); //starta om splelet 
  toggleVisibility(gameContainer, true); 
  toggleVisibility(startSection, false); 
  toggleVisibility(gameOverMessage, false); 
});

// Kasta tärningen 
rollDiceButton.addEventListener("click", () => {
  const diceRoll = Math.floor(Math.random() * 6) + 1; // Generera ett nummer (1–6)
  diceDisplay.textContent = `Tärning: ${diceRoll}`;
  if (diceRoll === 1) {
    gameState.roundScore = 0; // om splearen slår 1 blir omgångens poäng 0 
    gameState.rounds++; // och nästa omgång börjar 
    messageDisplay.textContent = "Du slog en etta! Omgången är slut.";
  } else {
    gameState.roundScore += diceRoll; // annars läggs  tärningens poäng till på omgångens poäng
    messageDisplay.textContent = "Fortsätt kasta eller frys poängen.";
  }
  updateUI();
});

// *** Frysa poäng ***
freezePointsButton.addEventListener("click", () => {
  gameState.totalScore += gameState.roundScore; // om pängen fryses läggs omgångens poäng till på totalpoängen
  gameState.roundScore = 0; // och omgångens poäng nollställs
  gameState.rounds++; // och nästa omgång börjar

  if (gameState.totalScore >= 100) {
    endGame(); // Spelet avslutas om totalpoängen når 100
  } else {
    messageDisplay.textContent = "Poängen är fryst! Fortsätt spela.";
  }
  updateUI(); 
});

// Starta om spelet
restartGameButton.addEventListener("click", () => {
  toggleVisibility(gameOverMessage, false); 
  toggleVisibility(gameContainer, false); 
  toggleVisibility(startSection, true); // starten visas igen
  playerNameInput.value = ""; // ta bort namnet 
  resetGame(); //spelet börjar om
});

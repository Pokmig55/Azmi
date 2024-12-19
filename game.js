// Level configurations
const tolerance = 1
const levels = [
    {
        level: 1,
        story: "Sherwood Forest: Robin Hood is practicing archery in the peaceful forest.",
        targetHint: "The target is close. A small or medium angle will hit the target.",
        correctAngle: 30,
    },
    {
        level: 2,
        story: "Village Square: A crowd gathers to watch Robin's archery skills.",
        targetHint: "The target is further away. Try a balanced angle.",
        correctAngle: 35,
    },
    {
        level: 3,
        story: "The Castle Gates: Robin is aiming for a distant target near the castle.",
        targetHint: "A high angle will help reach the far-off target.",
        correctAngle: 60,
    },
    {
        level: 4,
        story: "The Hidden Tower: The Sheriff is watching. Robin must be precise.",
        targetHint: "Precision is key. A mid-range angle will work best.",
        correctAngle: 50,
    },
    {
        level: 5,
        story: "The King's Hall: Robin must shoot through the narrow hall to hit the target.",
        targetHint: "The path is narrow. Be precise with your angle.",
        correctAngle: 45,
    },
    {
        level: 6,
        story: "The Final Trial: Robin's greatest challenge awaits.",
        targetHint: "This is it. Only the perfect angle will succeed.",
        correctAngle: 40,
    },
];

let currentLevel = 0;

// Display the story for the current level
function displayStory() {
    const { level, story } = levels[currentLevel];
    const storyLog = document.getElementById("story-log");
    storyLog.innerHTML = `
        <div>Level ${level}</div>
        <div>${story}</div>
    `;
    document.getElementById("story-container").style.display = "block";
    document.getElementById("gameplay-container").style.display = "none";
}

// Load the gameplay for the current level
function loadGameplay() {
    const { level, targetHint } = levels[currentLevel];
    const gameLog = document.getElementById("game-log");

    gameLog.innerHTML = `
        <div>Level ${level}</div>
        <div>${targetHint}</div>
        <div>Type the correct angle to hit the target (within ±${tolerance} of the correct angle):</div>
    `;

    document.getElementById("story-container").style.display = "none";
    document.getElementById("gameplay-container").style.display = "block";
}

// Process the player's input
function handleInput() {
    const angleInput = parseInt(document.getElementById("angle-input").value, 10);
    const { correctAngle } = levels[currentLevel];

    if (Math.abs(angleInput - correctAngle) <= tolerance) {
        logFeedback("You hit the target! Well done!");

        currentLevel++;
        if (currentLevel < levels.length) {
            logFeedback(`Prepare for Level ${levels[currentLevel].level}...`);
            displayStory();
        } else {
            logFeedback("Congratulations! You've completed all levels and become Nottingham's hero!");
            document.getElementById("fire-button").disabled = true;
        }
    } else {
        logFeedback(`You missed the target. Try again. (Hint: Aim within ±${tolerance} of the correct angle)`, true);
    }
}

// Log feedback for the player
function logFeedback(message, isHint = false) {
    const log = document.getElementById("game-log");
    const messageClass = isHint ? "hint" : "success";
    log.innerHTML += `<div class="${messageClass}">${message}</div>`;
    log.scrollTop = log.scrollHeight;
}

// Initialize the game
function initGame() {
    currentLevel = 0;
    displayStory();
}

// Event listeners
document.getElementById("skip-button").addEventListener("click", loadGameplay);
document.getElementById("fire-button").addEventListener("click", handleInput);
window.onload = initGame;

const { gameConfig } = require("./config");
const { Game } = require("./Game");

const snakeLadderInstance = new Game(gameConfig);
snakeLadderInstance.startGame();

const { Board } = require("./Board");
const { Dice } = require("./Dice");
const { Player } = require("./Player");

class Game {
  static instance;
  constructor(gameConfig) {
    if (Game.instance) return Game.instance;

    const { players, snakes, ladders } = gameConfig;
    this.board = new Board(snakes, ladders);
    this.dice = new Dice();
    this.players = [];
    console.log("players.length: ", players.length);
    for (let player = 0; player < players.length; player++) {
      this.players.push(new Player(players[player]));
    }
    Game.instance = this;
  }

  startGame() {
    let isGameOver = false;
    while (!isGameOver) {
      for (const player of this.players) {
        const diceRoll = this.dice.roll();
        const intermediatePosition = player.getPosition() + diceRoll;
        const transporter = this.board.getTransporter(intermediatePosition);
        console.log("transporter : ", transporter);
        let finalPosition = transporter
          ? transporter.move(intermediatePosition)
          : intermediatePosition;
        if (finalPosition > 100) continue;
        player.setPosition(finalPosition);
        console.log("player : ", player.name, " reached at : ", finalPosition);
        if (finalPosition == 100) {
          console.log("Player ", player.name, " wins!!!");
          isGameOver = true;
          break;
        }
      }
    }
  }
}

module.exports = { Game };

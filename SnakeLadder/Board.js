const { Snake, Ladder } = require("./Transporter");

class Board {
  constructor(snakes, ladders) {
    this.snakes = [];
    this.ladders = [];
    this.transporterMap = new Map(); // position -> transporter
    snakes.map((snake) => {
      const snakeInstance = new Snake(snake.from, snake.to);
      this.snakes.push(snakeInstance);
      this.transporterMap.set(snake.from, snakeInstance);
    });
    ladders.map((ladder) => {
      const ladderInstance = new Ladder(ladder.from, ladder.to);
      this.ladders.push(ladderInstance);
      this.transporterMap.set(ladder.from, ladderInstance);
    });
  }

  getTransporter(position) {
    return this.transporterMap.get(position) || null;
  }
}

module.exports = { Board };

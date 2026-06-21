class Dice {
  constructor() {}

  roll() {
    return (Math.floor(Math.random() * 10) % 6) + 1;
  }
}

module.exports = { Dice };

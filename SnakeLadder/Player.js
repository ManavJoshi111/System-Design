class Player {
  constructor(n) {
    this.name = n;
    this.position = 0;
  }

  getPosition() {
    return this.position;
  }

  setPosition(newPos) {
    this.position = newPos;
  }
}

module.exports = { Player };

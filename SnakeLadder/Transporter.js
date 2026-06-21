class Transporter {
  constructor(f, t) {
    this.from = f;
    this.to = t;
  }

  move(pos) {
    if (pos == this.from) return this.to;
    throw new Error("Invalid call");
  }
}

class Snake extends Transporter {
  constructor(f, t) {
    super(f, t);
  }
}

class Ladder extends Transporter {
  constructor(f, t) {
    super(f, t);
  }
}

module.exports = {
  Snake,
  Ladder,
};

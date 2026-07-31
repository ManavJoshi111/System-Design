const { EventEmitter } = require("events");

class WorkerQueue extends EventEmitter {
  constructor(c) {
    super();
    this.tasks = [];
    this.concurrency = c;
    this.activeTasks = 0;
    this.MAX_RETIRES = 3;
  }

  enqueue(job, id) {
    this.tasks.push({ job, id, retries: 0 });
    if (this.activeTasks < this.concurrency) this.runNext();
  }

  runNext() {
    if (this.tasks.length === 0 && this.activeTasks === 0) {
      this.emit("drain");
      return;
    }
    while (this.tasks.length && this.activeTasks < this.concurrency) {
      const data = this.tasks.shift();
      const { job, id, retries } = data;
      this.activeTasks++;
      this.emit("start", data);
      job()
        .then((res) => this.emit("completed", { id, res }))
        .catch((err) => {
          this.emit("error", err);
          if (retries < this.MAX_RETIRES)
            this.tasks.push({ ...data, retries: retries + 1 });
        })
        .finally(() => {
          this.activeTasks--;
          this.runNext();
        });
    }
  }
}

module.exports = { WorkerQueue };

const { WorkerQueue } = require("./Queue");

const myQueue = new WorkerQueue(2);

const cb1 = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  return data;
};

const cb2 = async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res("Timeout done");
    }, 2000);
  });
};

const cb3 = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/5");
  const data = await res.json();
  return data;
};

myQueue.on("start", (data) => {
  console.log("job started : ", data.id);
});

myQueue.on("error", (err) => console.log("error : ", err));

myQueue.on("completed", (data) => console.log("job completed : ", data));

myQueue.enqueue(cb1, 1);
myQueue.enqueue(cb2, 2);
myQueue.enqueue(cb3, 3);

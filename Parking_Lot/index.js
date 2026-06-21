const { ParkingLot } = require("./ParkingLot");
const { Vehicle } = require("./Vehicle");
const { parkingLotConfig } = require("./config");

const parkingLot = new ParkingLot(parkingLotConfig);
const b1 = new Vehicle(1, "bike");
const b2 = new Vehicle(2, "bike");
const t1 = new Vehicle(123, "truck");

let result = parkingLot.park(b1);
console.log(result);

result = parkingLot.park(t1);
console.log(result);

result = parkingLot.park(b2);
console.log(result);

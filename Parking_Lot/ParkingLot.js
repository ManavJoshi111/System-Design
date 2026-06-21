const { vehicleToSpotMap } = require("./config");

class Spot {
  constructor(spotId, size) {
    this.spotId = spotId;
    this.size = size;
    this.isAvailable = true;
    this.vehicleNo = null;
  }

  checkAvailability(v) {
    return this.size == vehicleToSpotMap[v.type] && this.isAvailable;
  }

  park(v) {
    if (this.isAvailable && vehicleToSpotMap[v.type] == this.size) {
      this.isAvailable = false;
      this.vehicleNo = v.no;
      console.log("Parked a vehicle of type : ", v.type, " and no : ", v.no);
    } else throw new Error("Spot already occupied or mismatching vechile type");
  }

  unpark() {
    console.log("unparked a vehicle named : ", this.vehicleNo);
    this.vehicleNo = null;
    this.isAvailable = true;
  }
}

class Floor {
  constructor(floorId, spots) {
    this.floorId = floorId;
    this.spots = [];
    spots.forEach((spot) => {
      this.spots.push(new Spot(spot.spotId, spot.size));
    });
  }

  checkAvailability(v) {
    for (let spot of this.spots) {
      if (spot.checkAvailability(v)) {
        return spot;
      }
    }
  }
}

class ParkingLot {
  constructor(config) {
    this.vehicleSpotMap = new Map();
    this.floors = [];
    for (let { floorId, spots } of config.floors) {
      this.floors.push(new Floor(floorId, spots));
    }
  }

  checkAvailability(v) {
    for (let floor of this.floors) {
      const spot = floor.checkAvailability(v);
      if (spot) {
        return {
          floor,
          spot,
        };
      }
    }
    return null;
  }

  park(v) {
    const details = this.checkAvailability(v);
    if (details) {
      details.spot.park(v);
      this.vehicleSpotMap.set(v.no, details.spot);
      return {
        success: true,
        floorId: details.floor.floorId,
        spotId: details.spot.spotId,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  unpark(v) {
    const spot = this.vehicleSpotMap.get(v.no);
    if (!spot) return { success: false, reason: "vehicle not found" };
    spot.unpark();
    this.vehicleSpotMap.delete(v.no);
    return { success: true };
  }
}

module.exports = { ParkingLot };

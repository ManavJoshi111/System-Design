const parkingLotConfig = {
  floors: [
    {
      floorId: 0,
      spots: [
        { spotId: "F0S0", size: "S" },
        { spotId: "F0S1", size: "M" },
        { spotId: "F0S2", size: "L" },
        { spotId: "F0S3", size: "L" },
      ],
    },
    {
      floorId: 1,
      spots: [
        { spotId: "F1S0", size: "M" },
        { spotId: "F1S1", size: "M" },
        { spotId: "F1S2", size: "M" },
        { spotId: "F1S3", size: "L" },
      ],
    },
    {
      floorId: 2,
      spots: [
        { spotId: "F2S0", size: "M" },
        { spotId: "F2S1", size: "M" },
        { spotId: "F2S2", size: "L" },
        { spotId: "F2S3", size: "L" },
      ],
    },
  ],
};

const vehicleToSpotMap = {
  bike: "S",
  car: "M",
  truck: "L",
};

module.exports = {
  parkingLotConfig,
  vehicleToSpotMap,
};

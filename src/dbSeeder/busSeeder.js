const buses = require("../models/busModel");
const { seatSeeder } = require("../dbSeeder/seatSeeder");

const busData = [
  {
    busName: "SJT Travels",
    busDesc: "Volvo AC multi Axle SemiSleeper (2+2)",
    from: "Chennai",
    to: "Tirunelveli",
    depart: "2020/07/28 18:30",
    arrive: "2020/07/29 08:30",
    duration: 14,
    seatsAvailable: 33,
    rating: 4.5,
    price: 1250
  },
  {
    busName: "Apple Travels",
    busDesc: "Volvo AC multi Axle SemiSleeper (2+2)",
    from: "Chennai",
    to: "Tirunelveli",
    depart: "2020/07/28 19:30",
    arrive: "2020/07/29 10:30",
    duration: 15,
    seatsAvailable: 33,
    rating: 2,
    price: 1200
  },
  {
    busName: "Trans-King",
    busDesc: "Volvo AC multi Axle SemiSleeper (2+2)",
    from: "Chennai",
    to: "Tirunelveli",
    depart: "2020/07/28 21:30",
    arrive: "2020/07/29 11:30",
    duration: 14,
    seatsAvailable: 33,
    rating: 4.9,
    price: 1950
  }
];

const busSeeder = async () => {
  await buses.sync({ force: true });
  busData.forEach(async (bus) => {
    try {
      const result = await buses.create(bus);
      console.log(bus);
      const { id, busName } = result.get();
      try {
        seatSeeder(id, busName);
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  });
};

busSeeder();

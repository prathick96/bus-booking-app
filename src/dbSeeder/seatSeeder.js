const seats = require("../models/seatModel");

const seatData = [
  {
    busid: 1,
    busName: "SJT Travels",
    seats: 1,
    availability: "yes"
  }
];

const seatSeeder = async (busid, busName) => {
  await seats.sync({ force: true });
  seatData.forEach(async (seat) => {
    try {
      for (let i = 1; i < 34; i++) {
        try {
          await seats.create({
            busid,
            busName,
            seats: i,
            availability: "yes"
          });
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports = seatSeeder;

seatSeeder(1, "SJT Travels");

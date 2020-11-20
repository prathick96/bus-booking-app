const users = require("../models/userModel");

const userData = [
  {
    firstName: "Padmanabhan",
    lastName: "Elangomanivannan",
    age: 24,
    email: "paddhu96@gmail.com",
    city: "Madurai",
    gender: "male"
  },
  {
    firstName: "Dhivya",
    lastName: "Suresh",
    age: 24,
    email: "dhivyakumar@gmail.com",
    city: "Chennai",
    gender: "female"
  }
];

const userSeeder = async () => {
  await users.sync({ force: true });
  userData.forEach(async (bus) => {
    try {
      const result = await users.create(bus);
      console.log(result.get());
    } catch (e) {
      console.error(e);
    }
  });
};

userSeeder();

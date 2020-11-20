const { Sequelize } = require("sequelize");

const ticketDb = new Sequelize(process.env.DB_URL);

(async () => {
  try {
    await ticketDb.authenticate();
    console.log("Connection established Successfully!");
  } catch (error) {
    console.error("Unable to connect:", error);
  }
})();

module.exports = ticketDb;

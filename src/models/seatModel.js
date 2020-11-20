const { DataTypes } = require("sequelize");
const travelDB = require("../config/db");
const busList = require("../models/busModel");

const seatModel = travelDB.define("seatmodel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busid: {
    type: DataTypes.INTEGER,
    references: {
      model: busList,
      key: "id"
    }
  },
  busName: {
    type: DataTypes.STRING,
    field: "busname"
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  availability: {
    type: DataTypes.ENUM,
    values: ["yes", "no"],
    allowNull: false
  }
});

module.exports = seatModel;

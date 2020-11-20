const { DataTypes } = require("sequelize");
const travelDB = require("../config/db");

const busModel = travelDB.define("busmodel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busName: {
    type: DataTypes.STRING,
    field: "bus_name",
    allowNull: false
  },
  busDesc: {
    type: DataTypes.STRING,
    field: "bus_desc",
    allowNull: false
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false
  },
  depart: {
    type: DataTypes.DATE,
    allowNull: false
  },
  arrive: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seatsAvailable: {
    type: DataTypes.INTEGER,
    field: "seats_available",
    allowNull: false
  },
  rating: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = busModel;

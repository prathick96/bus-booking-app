const express = require("express");
const bodyparser = require("body-parser");
const expressHBS = require("express-handlebars");
const path = require("path");
const Buses = require("./models/busModel");
const Seats = require("./models/seatModel");
const Users = require("./models/userModel");
const { equality, equal, rating } = require("./views/helpers/ifEquality");
const {
  rowstart,
  rowend,
  rowmid,
  rowfour
} = require("./views/helpers/rowCount");
const travelDb = require("./config/db");
const { QueryTypes } = require("sequelize");

const app = express();

const getAllBuses = async () => {
  const result = await Buses.findAll({
    order: [["id", "ASC"]]
  });
  return JSON.parse(JSON.stringify(result));
};

const getAllseats = async (id) => {
  const result = await Seats.findAll({
    where: { busid: id },
    order: [["seats", "ASC"]]
  });
  return JSON.parse(JSON.stringify(result));
};

const getuser = async (email) => {
  const result = await Users.findAll({
    where: { email }
  });
  return JSON.parse(JSON.stringify(result));
};

const updateseats = async (seats, busid) => {
  const result = await Seats.update(
    { availability: "no" },
    { where: { busid: busid, seats: seats } }
  );

  let avail = await travelDb.query(
    `SELECT seats_available FROM busmasters where id = ${busid}`,
    { type: QueryTypes.SELECT }
  );

  avail = parseInt(avail[0].seats_available) - 1;

  await Buses.update(
    { seatsAvailable: avail },
    {
      where: { id: busid }
    }
  );
  return JSON.parse(JSON.stringify(result));
};

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const hbs = expressHBS.create({
  extname: "hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    equality,
    rowstart,
    rowend,
    rowmid,
    rowfour,
    equal,
    rating
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (request, response) => {
  response.status(200).render("home.hbs", {
    layout: "hero.hbs",
    title: "Home"
  });
});

app.get("/adduser", (request, response) => {
  try {
    response.status(200).render("addUser.hbs", {
      layout: "hero.hbs",
      title: "User",
      action: "/user",
      method: "POST"
    });
  } catch (e) {
    console.log(e);
    response.status(500).send("Internal Server error");
  }
});

app.get("/list", async (request, response) => {
  try {
    response.status(200).render("busList.hbs", {
      layout: "hero.hbs",
      title: "Buses",
      data: await getAllBuses()
    });
  } catch (e) {
    console.log(e);
    response.status(500).send("Internal Server error");
  }
});

app.get("/viewseats/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await getAllseats(id);
    console.log(result);
    response.status(200).render("seats.hbs", {
      layout: "hero.hbs",
      title: "Buses",
      data: result,
      busid: id
    });
  } catch (e) {
    console.log(e);
    response.status(500).send("Internal Server error");
  }
});

app.get("/updateseats/:busid/:seats", async (request, response) => {
  try {
    const { seats, busid } = request.params;
    const result = await updateseats(seats, busid);
    console.log(result);
    response.status(200).send({
      message: "Updated"
    });
  } catch (e) {
    console.log(e);
    response.status(500).send("Internal Server error");
  }
});

app.get("/success", (request, response) => {
  response.status(200).render("success.hbs", {
    layout: "Hero.hbs",
    title: "Complete"
  });
});

app.post("/user", async (request, response) => {
  try {
    if (request.body.firstName) {
      console.log(request.body);
      const exists = await getuser(request.body.email);
      console.log(exists);
      if (exists.length) {
        response.status(401).json({
          message: "email already exists",
          data: exists
        });
      }
      const result = await Users.create(request.body);
      response.status(200).json({
        message: "User added Succesfully",
        data: result
      });
    }
  } catch (e) {
    response.status(402).json({
      message: "Check input data"
    });
  }
});

app.listen(8080, () => {
  console.log("server is running");
});

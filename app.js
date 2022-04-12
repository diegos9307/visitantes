const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connection;
const Schema = mongoose.Schema;
const app = express();
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost:27017/mongo-1",
  { useNewUrlParser: true }
);

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("db connected");
});

const VisitorSchema = new Schema({
  name: String,
  date: { type: Date, default: Date.now },
});

const Visitor = mongoose.model("Visitor", VisitorSchema);

app.get("/", async (req, res) => {
  let usuario = req.query.name;
  if (!usuario || usuario.length === 0) {
    usuario = "Anónimo";
    const visitor = new Visitor({
      name: usuario,
    });
    await visitor.save();
    res.send(`<h1>El visitante fue almacenado con éxito</h1>`);
  } else {
    const visitor = new Visitor({
      name: usuario,
    });
    await visitor.save();
    res.send(`<h1>El visitante fue almacenado con éxito</h1>`);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`running in port ${process.env.PORT} `)
);

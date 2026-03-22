const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 conexión a MongoDB (luego pondremos la URL real)
mongoose.connect("mongodb+srv://usuario:clave123@prueba1a.aqztp83.mongodb.net/?appName=prueba1A")
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.log(err));

// modelo
const Usuario = mongoose.model("Usuario", {
  nombre: String
});

// guardar datos
app.post("/guardar", async (req, res) => {
  const nuevo = new Usuario({ nombre: req.body.nombre });
  await nuevo.save();
  res.send("Guardado");
});

// obtener datos
app.get("/usuarios", async (req, res) => {
  const datos = await Usuario.find();
  res.json(datos);
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Conexión a MongoDB Atlas
// Agrega en Render la variable de entorno:
// MONGO_URI = mongodb+srv://usuario:pass@cluster.mongodb.net/miDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.log("❌ Error al conectar a MongoDB:", err));

// 🔹 Modelo de Usuario
const Usuario = mongoose.model("Usuario", {
  nombre: String
});

// 🔹 Rutas del backend
// Guardar un usuario
app.post("/guardar", async (req, res) => {
  try {
    const nuevo = new Usuario({ nombre: req.body.nombre });
    await nuevo.save();
    res.status(201).send("Usuario guardado correctamente ✅");
  } catch (error) {
    res.status(500).send("Error al guardar usuario ❌");
  }
});

// Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const datos = await Usuario.find();
    res.json(datos);
  } catch (error) {
    res.status(500).send("Error al obtener usuarios ❌");
  }
});

// 🔹 Ruta raíz (para probar el servidor)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔹 Puerto dinámico para Render o 3000 para local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor corriendo en puerto ${PORT}`);
});

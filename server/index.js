/**
 * Importamos los paquetes y lo instanciamos en una variable
 */
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require("socket.io")
app.use(cors());
/**
 * Creamos el server con http y instanciamos io
 * con el server creado, opciones adicionales con los cors
 */


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
/**
 * Esuchamos nuestro socket.io
 * 
 */


io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User joined ${socket.id} , room : ${room}`);
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  })
})

server.listen(3001, function servidorEscuchando() {
  console.log("SERVER RUNNING");
})
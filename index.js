const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
let { Server: HttpServer } = require("http");
let { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const messages = require("./models/dbHelpers");
const productos = require('./routes/routes.productos')
const cors = require("cors");
const path = require("path");
const PORT = 8080;

// Initializations
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Configurations
app.use(cors('*'));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname,"public")));
app.use('/api/productos', productos)


// Set Handlebars engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/public",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.set("view engine", "hbs");
app.set("views", "./public");

app.post("/productos", (req, res, next) => {
  console.log("le pega a post productos");
  // res.redirect('/productos');
});

app.post("/api/mensajes", (req, res) => {
  messages.add(req.body)
  res.redirect('/productos')
});

app.get("/productos", (req, res, next) => {
  res.render('index');
});

httpServer.listen(PORT, () => {
  console.log(`Desafio funcionando en la URL http://localhost:${PORT}/productos`);
});

let notes = []; // Here is where the notes are been archived
let msgs = [];  // Here is where the messages are been archived


//Conexion de SOCKET.IO
io.on("connection", (socket) => {
  console.log("new connection", socket.id);     // Me Avisa si hay un logueo y me devuelve el id
  io.sockets.emit("server:loadnotes", notes);   // Le envio los productos a una nueva conexion
  io.sockets.emit("server:loadmessages", msgs); // Le envio las notas a una nueva conexion

// Se agregan los productos al html cuando le envio "note" por el socket.emit
  socket.on("client:newnote", (data) => {
    const note = {
      title: data.title,
      description: data.price,
      thumbnail: data.thumbnail,
    };
    notes.push(note);
    io.sockets.emit("server:newnote", note);
  });

// Se agregan los mensajes al html cuando le envio "msg" por el socket.emit
  socket.on('client:newmessage', (data) => {
      const msg = {
          mail: data.mail,
          message: data.message,
          time: data.time
      }
      msgs.push(msg);
      io.sockets.emit("server:newmessage", msg);
  })

});

module.exports = app;
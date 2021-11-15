const fs = require("fs");
const express = require("express");
let { Server: HttpServer } = require("http");
let { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const cors = require("cors");
const path = require("path");
const PORT = 8080;

// Initializations
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname,"public")));


// Set hbs engine
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

app.get("/productos", (req, res, next) => {
  console.log("le pega a get productos");
  res.render('index');
});

httpServer.listen(PORT, () => {
  console.log(`Desafio funcionando en la URL http://localhost:${PORT}/productos`);
});

let notes = []; // Here is where the notes are been archived
let msgs = [];  // Here is where the messages are been archived

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  io.sockets.emit("server:loadnotes", notes);
  io.sockets.emit("server:loadmessages", msgs);

  socket.on("client:newnote", (data) => {
    console.log(data);
    const note = {
      title: data.title,
      description: data.price,
      thumbnail: data.thumbnail,
    };
    notes.push(note);
    console.log(notes);
    io.sockets.emit("server:newnote", note);
  });

  socket.on('client:newmessage', (data) => {
      console.log(data);
      const msg = {
          mail: data.mail,
          message: data.message,
          time: data.time
      }
      msgs.push(msg);
      io.sockets.emit("server:newmessage", msg);
  })

});

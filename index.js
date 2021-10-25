const express = require('express');
const app = express();
const handlebars = require("express-handlebars");
const cors = require('cors')
// const serverRoutes = require("./routes");
const path = require("path")
const PORT = 8080;
const {productos} = require('./productos')

app.use("/", express.static(path.join(__dirname,"public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.engine("hbs", 
handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials/"
    })
);

app.set("view engine", "hbs");
app.set("views", "./views/layouts");
// app.use(express.static("public"));

// serverRoutes(app);


app.post("/productos", (req, res, next)=>{
    productos.push(req.body);
    res.redirect('/')
})

app.get("/productos", (req, res, next)=>{
    console.log(productos);
    res.render('index', productos);
})

const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en la URL http://localhost:${PORT}`);
})















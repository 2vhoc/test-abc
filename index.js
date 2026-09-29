const express = require('express');
const system = require("./config/system.js");
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');


const app = express()





require("dotenv").config(); // khai bao

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// extended quy định cách phân tích dl : false là kiểu đơn giản , true là kiểu dl lồng nhau


const database = require("./config/database") // khai bao  csdl 
database.connect(); // ham

const port = process.env.PORT || 9000; // lấy các biến trong env 

const router = require("./router/client/index.router.js") // khai bao router client 

const routerAdmin = require("./router/admin/index.router.js") // khai bao router admin 


// Flash 
app.use(cookieParser('HLBB'));
app.use(session({
  secret: 'HLBB',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(flash());

// End Flash 


app.use(methodOverride('_method'))

app.use(express.static(`${__dirname}/public`)) // thư mục chứa file tĩnh , ra bên ngoài 

app.locals.prefixAdmin = system.prefixAdmin // biến toàn cục , có thể dùng ở mọi nơi trong pug



app.set("views", `${__dirname}/views`);

app.set("view engine", "pug");


router(app)
routerAdmin(app);




if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

module.exports = app;

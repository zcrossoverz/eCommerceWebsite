const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// load config
dotenv.config();

const app = express();

// import routes
const setupRouteProduct = require("./app/routes/product.route");
const setupRouteOrder = require("./app/routes/order.route");
const setupRouteUser = require("./app/routes/user.route");

// set up middleware
app.use(cors());
app.use(express.json());


// set up routes
setupRouteProduct(app);
setupRouteOrder(app);
setupRouteUser(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})
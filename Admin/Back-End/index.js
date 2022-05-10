process.env.NODE_ENV = "production";
const express = require("express");
const helmet = require("helmet");
var cors = require("cors");
const app = express();
const route = require("./routers");
const methodOverride = require("method-override");
const auth = require("./middleware/auth");
const port = 5000;
app.use(helmet());
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//Method overRide
app.use(methodOverride("_method"));

app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});
//connect router
route(app);

app.listen(process.env.PORT || port, () => {
    console.log(`App listening at http://localhost:${port}`);
}).timeout = 30000;

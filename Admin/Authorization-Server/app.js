require("dotenv").config();
require("./config/database").connect();
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

let refreshTokens = [];

app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { username, email, password } = req.body;

        // Validate user input
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ username });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});
app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { username, password } = req.body;
        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const accessToken = jwt.sign(
                { user_id: user.username, password },
                process.env.ACCESS_TOKEN_KEY,
                {
                    expiresIn: "30m",
                }
            );
            const refreshToken = jwt.sign(
                { user_id: user.username, password },
                process.env.REFRESH_TOKEN_KEY
            );
            // save user token
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;

            refreshTokens.push(refreshToken);

            // user
            res.status(200).json(user);
        }
        // res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});
app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});
app.post("/refresh", async (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) res.sendStatus(401);
    // if (!refreshTokens.includes(refreshToken)) res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, data) => {
        console.log(err, data);
        // if (err) res.sendStatus(403);
        const accessToken = jwt.sign(
            { user_id: data.user_id, password: data.password },
            process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        res.json({ accessToken });
    });
});

// This should be the last route else any after it won't work
app.use("*", async (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
            statusCode: 404,
            message: "You reached a route that is not defined on this server",
        },
    });
});

module.exports = app;

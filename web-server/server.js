const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 5555;
// Secret key used for signing and verifying tokens

// Get from  KEY CLOAK ADMIN
var public_key = process.env.PUBLIC_KEY_KEYCLOAK || "";
var keycloak_pulic_key = `-----BEGIN PUBLIC KEY-----\n${public_key}\n-----END PUBLIC KEY-----`;
// const oldkey = keycloak_pulic_key;

const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
// Set the Pug template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }
  // console.log("key", keycloak_pulic_key);
  // console.log("old key", oldkey);
  // console.log("compare key", oldkey == keycloak_pulic_key);

  jwt.verify(
    token,
    keycloak_pulic_key,
    { algorithms: ["RS256"] },
    (err, user) => {
      if (err) {
        res.status(403);
        return res.send({ error: err });
      }

      req.user = user;
      next();
    }
  );
}

// Protected route that requires authentication
app.get("/protected", authenticateToken, (req, res) => {
  res.send(["Trung", "Hanh", "Quang", "Hang", " Phuong Linh"]);
});

// api set key when run dockercompse  /setkey?key=
// app.get("/setkey", (req, res) => {
//   // public_key = req.query.key;
//   // public_key = public_key.replace(/\s/g, "");
//   // keycloak_pulic_key = `-----BEGIN PUBLIC KEY-----\n${public_key}\n-----END PUBLIC KEY-----`;
//   // res.send(keycloak_pulic_key);
//   res.render("form");
// });

// app.post("/settedkey", (req, res) => {
//   public_key = req.body.name;
//   keycloak_pulic_key = `-----BEGIN PUBLIC KEY-----\n${public_key}\n-----END PUBLIC KEY-----`;
//   res.send(keycloak_pulic_key);
// });

app.get("/", (req, res) => {
  res.send("abc");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

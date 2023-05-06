const express = require("express");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 5555;
const cors = require("cors");
require("dotenv").config();

// Secret key used for signing and verifying tokens
// Get from  KEY CLOAK ADMIN
const keyCloak_pulic_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY_KEYCLOAK}\n-----END PUBLIC KEY-----`;

const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    keyCloak_pulic_key,
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

app.get("/", (req, res) => {
  res.send("abc");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const express = require("express");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 5555;
const cors = require("cors");

// Secret key used for signing and verifying tokens
const secretKey =
  "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs/1a20MD0H1qpwWL9zCU38V+Bt2D1gRKMaNfMrfqhw5SPYOl/sv1udOM1Wu7zwiCWB0qjdI6MpHf2R8A6130+Fe11soqg+3PJfdmJYFl6IrwOpOGk3fUEqEDYcVaDskWpQWy2YCB0qa9k5SBVpcAWNu/behS92HYYP7KE6d9txFyKll8wLfeP0RjNcaRz0u539nOiSZYm9RFPRyKg+wyKBukhujN3Dkh4sisHQwH7HWo5Ugn8p0oK8cuJRmkoGfFZ/juDRVsz6tEwbCQK74eu5ynl2W/iyGkSmCHirjYcj8PVyhL1esqimcbChAUhIa7Yfsb8Br3uN+Vq5A6W8nzyQIDAQAB\n-----END PUBLIC KEY-----";

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

  jwt.verify(token, secretKey, { algorithms: ["RS256"] }, (err, user) => {
    if (err) {
      res.status(403);
      return res.send({ error: err });
    }

    req.user = user;
    next();
  });
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

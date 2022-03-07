const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on("error", console.error.bind(console, "Mongodb Connection Error:"));

db.once("open", () => {
  console.log("Mongodb Connection Successful");
});
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

require("dotenv").config({path: "./.env"});
const express = require("express");
const eventroutes = require("./routes/event.routes");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventroutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
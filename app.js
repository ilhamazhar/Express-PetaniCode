const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = 3005;

const indexRoutes = require("./routes/index");
const aspirasiRoutes = require("./routes/aspirasi");
const wargaRoutes = require("./routes/warga");

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("", indexRoutes);
app.use("/aspirasi", aspirasiRoutes);
app.use("/warga", wargaRoutes);

app.listen(port, () => {
  console.log(`Aplikasi warga berjalan di port:${port}`);
});

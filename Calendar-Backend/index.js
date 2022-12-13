const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");
const {validarJWT} = require("./middlewares/validar-jwt");
const {revalidarToken} = require("./controllers/auth");

const app = express();

dbConnection().then();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());


app.use("/api/auth", require("./routes/auth"));
app.use("/api/renew", require("./routes/renew"));
app.use("/api/events", require("./routes/events"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

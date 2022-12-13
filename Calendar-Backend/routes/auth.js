const { Router } = require("express");
const { loginUsuario } = require("../controllers/auth");

const router = Router();

router.get(
  "/:email",
  loginUsuario
);

module.exports = router;

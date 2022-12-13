const { Router } = require("express");

const { revalidarToken } = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJWT, revalidarToken);

module.exports = router;

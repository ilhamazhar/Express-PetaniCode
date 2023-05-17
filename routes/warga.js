const express = require("express");
const router = express.Router();

const getWarga = require("../services/warga/get-warga");
const getWargaById = require("../services/warga/get-warga-by-id");
const postWarga = require("../services/warga/post-warga");

router.get("/", getWarga);
router.get("/:id", getWargaById);
router.post("/", postWarga);
module.exports = router;

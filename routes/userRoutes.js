const express = require("express");

const router = express.Router();

router.post("/login", auth.login);
router.post("/signup", auth.signup);

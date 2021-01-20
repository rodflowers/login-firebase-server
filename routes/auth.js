const express = require("express");

const {
  getCurrentUser,
  postCurrentUser,
  privateRoute,
} = require("../controller/auth");

const router = express.Router();

router.route("/").get(getCurrentUser).post(postCurrentUser);

router.route("/private-route").get(privateRoute);

module.exports = router;

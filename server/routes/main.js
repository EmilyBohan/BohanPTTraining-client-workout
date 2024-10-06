const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const postsController = require("../controllers/posts");
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.post("/signup", authController.postSignup);

module.exports = router;
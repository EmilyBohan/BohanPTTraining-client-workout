import express from "express";
const router = express.Router();

import * as authController from "../controllers/auth.js";
import * as postsController from "../controllers/posts.js";
import * as homeController from "../controllers/home.js";
import { ensureAuth, ensureGuest } from "../middleware/auth.js";


// Google Auth
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleCallback);


//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.post("/signup", authController.postSignup);

export default router;

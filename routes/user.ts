import {Router} from "express";
import {usersController} from "../controllers/UsersController.js";
import {bbsMiddleware} from "../controllers/BbsMiddleware.js";

const router = Router();

router.route("/login")
    .get(usersController.login)
    .post(usersController.authenticate);
router.get("/success", usersController.success, bbsMiddleware.redirect);
router.get("/logout", usersController.logout, bbsMiddleware.redirect);
router.route("/new")
    .get(usersController.newIndex)
    .post(usersController.create, bbsMiddleware.redirect);

export const userRoutes = router;
import {Router} from "express";
import {bbsMiddleware} from "../controllers/BbsMiddleware.js";
import {messagesController} from "../controllers/MessagesController.js";

const router = Router();

router.route("/new/:tid")
    .all(bbsMiddleware.requireLogin, bbsMiddleware.loadThread)
    .get(messagesController.newIndex)
    .post(messagesController.create, bbsMiddleware.redirect);
router.route("/delete/:tid/:mid")
    .all(bbsMiddleware.requireLogin, bbsMiddleware.loadThread)
    .get(messagesController.remove, bbsMiddleware.redirect);

export const messageRoutes = router;
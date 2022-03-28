import {Router} from "express";
import {bbsMiddleware} from "../controllers/BbsMiddleware.js";
import {threadsController} from "../controllers/ThreadsController.js";

const router = Router();

router.route("/new/:cid")
    .all(bbsMiddleware.requireLogin, bbsMiddleware.loadCategory)
    .get(threadsController.newIndex)
    .post(threadsController.create, bbsMiddleware.redirect);
router.use("/read/:tid", bbsMiddleware.loadThread, bbsMiddleware.loadMessages);
router.get("/read/:tid/latest", threadsController.index);
router.get("/read/:tid/all", threadsController.index);
router.get("/read/:tid", threadsController.index);
router.use("/delete/:tid", bbsMiddleware.requireLogin, bbsMiddleware.loadThread);
router.get("/delete/:tid", threadsController.remove, bbsMiddleware.redirect);

export const threadRoutes = router;
import {Router} from "express";
import {homeController} from "../controllers/HomeController.js";
import {bbsMiddleware} from "../controllers/BbsMiddleware.js";


const router: Router = Router();

router.get("/category/:cid", bbsMiddleware.loadCategory, bbsMiddleware.loadThreads, homeController.threads);
router.get("/", bbsMiddleware.loadCategories, homeController.index);

export const homeRoutes = router;
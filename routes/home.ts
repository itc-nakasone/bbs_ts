import {Router} from "express";
import {homeController} from "../controllers/HomeController";
import {bbsMiddleware} from "../controllers/BbsMiddleware";


const router: Router = Router();

router.get("/", bbsMiddleware.loadCategories, homeController.index);

export const homeRoutes = router;
import {Router} from "express";
import {homeRoutes} from "./home.js";

const router: Router = Router();

router.use("/", homeRoutes);

export {router as Routes}
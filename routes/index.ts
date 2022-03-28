import {Router} from "express";
import {homeRoutes} from "./home.js";
import {messageRoutes} from "./message.js";
import {threadRoutes} from "./thread.js";
import {userRoutes} from "./user.js";

const router: Router = Router();

router.use("/messages", messageRoutes);
router.use("/threads", threadRoutes);
router.use("/users", userRoutes);
router.use("/", homeRoutes);

export {router as Routes}
import type {NextFunction, Request, RequestHandler, Response} from "express";
import {Category} from "../models/Category.js";

const redirect: RequestHandler = (_: Request, res: Response, next: NextFunction) => {
    if (res.locals["redirect"] != null) {
        res.redirect(res.locals["redirect"]);
    } else {
        next();
    }
};

const loadCategories: RequestHandler = async (_: Request, res: Response, next: NextFunction) => {
    try {
        res.locals["categories"] = await Category.find().sort({serial: 1}).exec();
        next();
    } catch (e) {
        console.warn("error occurred in Model-Category.", e);
        res.locals["categories"] = [];
        next();
    }
};

const loadCategory: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cid = req.params["cid"];
        const category = await Category.findById(cid).exec();
        if (category == null) {
            return next(new Error("Category Id is invalid!!!!"));
        }
        res.locals["category"] = category;
        next();
    } catch (e) {
        console.error("error occurred in Model-Category");
        next(e);
    }
};

export const bbsMiddleware = {
    redirect, loadCategories, loadCategory
}
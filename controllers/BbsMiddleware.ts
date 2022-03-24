import type {NextFunction, Request, RequestHandler, Response} from "express";
import {Category} from "../models/Category";

const loadCategories: RequestHandler = async (_: Request, res: Response, next: NextFunction) => {
    try {
        res.locals["categories"] = await Category.find().sort({serial: 1}).exec();
        next();
    } catch (e) {
        console.warn("error occurred in Model-Category.", e);
        res.locals["categories"] = [];
        next();
    }
}

export const bbsMiddleware = {
    loadCategories,
}
import type {NextFunction, Request, RequestHandler, Response} from "express";
import {Category} from "../models/Category.js";
import {Thread} from "../models/Thread";
import {Message} from "../models/Message";

const redirect: RequestHandler = (_: Request, res: Response, next: NextFunction) => {
    if (res.locals.redirect != null) {
        res.redirect(res.locals.redirect);
    } else {
        next();
    }
};

const loadCategories: RequestHandler = async (_: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.categories = await Category.find().sort({serial: 1}).exec();
        next();
    } catch (e) {
        console.warn("error occurred in Model-Category.", e);
        res.locals.categories = [];
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
        res.locals.category = category;
        next();
    } catch (e) {
        console.error("error occurred in Model-Category");
        next(e);
    }
};

const loadThreads: RequestHandler = async (_: Request, res: Response, next: NextFunction) => {
    try {
        res.locals.threads = await Thread.find({category: res.locals["category"]})
            .sort({updatedAt: -1}).exec();
        next();
    } catch (e) {
        console.warn("error occurred in Model-Thread.", e);
        res.locals.threads = [];
        next();
    }
}

const loadThread: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const thread = await Thread.findById(req.params["tid"]).exec();
        if (thread == null) {
            return next(new Error("Thread Id is invalid!!!"));
        }
        res.locals["thread"] = thread;
        next();
    } catch (e) {
        console.error("error occurred in Model-Thread.", e);
        next(e);
    }
}

const loadMessages: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals["thread"] == null) {
        return next(new Error("Thread is null"));
    }

    try {
        const query = Message.find({thread: res.locals["thread"]})
            .sort({createdAt: -1})
            .populate("user");
        if (req.path.match(/\/latest$/)) {
            query.limit(50);
        }
        const messages = await query.exec();
        res.locals.messages = messages.reverse();
        next();
    } catch (e) {
        console.warn("error occurred in Model-Message", e);
        res.locals.messages = [];
        next();
    }
}

const requireLogin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.loggedIn) {
        if (req.session.refUrl == null) {
            req.session.refUrl = req.originalUrl;
        }
        return res.redirect("/users/login");
    }
    next();
};

export const bbsMiddleware = {
    redirect, loadCategories, loadCategory, loadThreads, loadThread, loadMessages, requireLogin
}
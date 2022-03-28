import {Thread} from "../models/Thread.js";
import {Message} from "../models/Message.js";
import type {NextFunction, Request, RequestHandler, Response} from "express";

const index: RequestHandler = (req: Request, res: Response) => {
    delete req.session.refUrl;
    res.render("threads/index");
};

const newIndex: RequestHandler = (_: Request, res: Response) => {
    res.render("threads/new");
}

const create: RequestHandler = async (req: Request, res:Response, next:NextFunction) => {
    if (res.locals.skip) return next();

    try {
        const thread = await Thread.create({
            title: req.body.title,
            category: res.locals.category,
            owner: res.locals.currentUser,
        });
        res.locals.redirect = `/threads/read/${thread._id}/latest`;
        res.locals.thread = thread;
        await Message.create({
            content: req.body.message,
            thread: thread,
            user: res.locals.currentUser,
        });
        next();
    } catch (e) {
        console.error("Error saving thread or first message...", e);
        if (res.locals.thread != null) {
            await res.locals.thread.remove();
        }
        next(e);
    }
}

const remove: RequestHandler = async (_: Request, res: Response, next: NextFunction) => {
    try {
        await Message.deleteMany({
            thread: res.locals.thread,
        }).exec();
        await Thread.findByIdAndRemove(res.locals.thread).exec();
        res.locals.redirect = "/";
        next();
    } catch (e) {
        console.log("Error deleting thread or messages...", e);
        next(e);
    }
}

export const threadsController = {
    index, newIndex, create, remove
}
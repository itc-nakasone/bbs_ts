import type {NextFunction, Request, RequestHandler, Response} from "express";
import {Message} from "../models/Message.js";
import "../custom_types/bbs.js";

type BbsParams = {
    mid: string;
    tid: string;
    cid: string;
}

const newIndex: RequestHandler = (_:Request, res: Response) => {
    res.render("messages/new");
}

const create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (req.skip || res.locals.thread == null || res.locals.currentUser == null) {
        return next();
    }

    try {
        await Message.create({
            content: req.body.message,
            thread: res.locals.thread,
            user: res.locals.currentUser,
        });
        res.locals.redirect = `/threads/read/${res.locals.thread._id}/latest`;
        next();
    } catch (e) {
        console.error("New message failed to create.", e);
        next(e);
    }
}

const remove: RequestHandler<BbsParams> = async (req: Request<BbsParams>, res: Response, next: NextFunction) => {
    try {
        await Message.findByIdAndUpdate(req.params.mid, {
            $set: {
                deleted: true
            }
        }).exec();
        res.locals.redirect = `/threads/read/${req.params.tid}/latest`;
        next();
    } catch (e) {
        console.error("Message failed to delete (update)..", e);
        next(e);
    }
}

export const messagesController = {
    newIndex, create, remove
}
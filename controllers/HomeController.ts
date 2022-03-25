import type {Request, RequestHandler, Response} from "express";

const index: RequestHandler = (_: Request, res: Response) => {
    res.render("home/index");
};

const threads: RequestHandler = (_: Request, res: Response) => {
    res.render("home/threads");
}

export const homeController = {
    index, threads
}
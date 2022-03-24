import type {Request, RequestHandler, Response} from "express";


const index: RequestHandler = ((_: Request, res: Response) => {
    res.render("home/index");
});

export const homeController = {
    index
}
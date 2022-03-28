import passport from "passport";
import {User} from "../models/User.js";
import type {NextFunction, Request, RequestHandler, Response} from "express";
import "../custom_types/bbs.js";

const authenticate: RequestHandler = passport.authenticate("local", {
    successRedirect: "/users/success",
    failureRedirect: "/users/login",
    failureFlash: "IDかパスワードがちがいます。",
});

const login:RequestHandler = (req: Request, res: Response) => {
    if (!req.session.refUrl) {
        req.session.refUrl = req.get("referer");
    }
    res.render("users/login");
};

const success: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.refUrl != null) {
        res.locals.redirect = req.session.refUrl;
        delete req.session.refUrl;
    } else {
        res.locals.redirect = "/";
    }
    next();
};

const logout: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    req.logout();
    res.locals.redirect = req.get("referer");
    next();
};

const newIndex: RequestHandler = (_: Request, res: Response) => {
    res.render("users/new");
}

const create: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (req.skip) return next();

    try {
        const tempUser = new User({
            username: req.body.username,
            view_name: req.body.view_name,
        });

        const user = await User.register(tempUser, req.body.password);
        if (user == null) {
            res.locals.redirect = "/users/new";
            res.locals.error = new Error("???");
            return next();
        }
        if (req.session.refUrl != null) {
            res.locals.redirect = req.session.refUrl;
            delete req.session.refUrl;
        } else {
            res.locals.redirect = "/";
        }
        next();
    } catch (e) {
        res.locals.redirect = "/users/new";
        res.locals.error = e;
        next();
    }
}

export const usersController = {
    authenticate, login, success, logout, newIndex, create,
}
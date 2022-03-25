import type {Application, NextFunction, Request, Response} from "express";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import {IUser, User} from "./models/User.js";
import mongoose from "mongoose";
import {Routes} from "./routes/index.js";
import type {ICategory} from "./models/Category";
import type {IThread} from "./models/Thread";
import type {IMessage} from "./models/Message";

declare module "express-session" {
    interface SessionData {
        refUrl: string;
    }
}

interface Locals {
    categories?: Array<ICategory>;
    category?: ICategory;
    currentUser?: Express.User | IUser | undefined;
    loggedIn?: boolean;
    messages?: Array<IMessage>;
    redirect?: string;
    threads?: Array<IThread>;
    thread?: IThread;
    skip?: boolean;
}

declare module "express" {
    export interface Response {
        locals: Locals
    }
}

const app: Application = express();

app.set("port", process.env["PORT"] || 3000);
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser("rzlqkCnvkNQnjguMvHuCfut6"));
app.use(session({
    secret: "rzlqkCnvkNQnjguMvHuCfut6",
    cookie: {maxAge: 4000000},
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

app.use(Routes);

try {
    await mongoose.connect("mongodb://localhost:27017/bbs");
    console.info("Successfully connected to MongoDB using Mongoose!");

    app.listen(app.get("port"), () => {
        console.info(`Server running at http://localhost:${app.get("port")}`);
    });
} catch (e) {
    console.error("Failed to start the server.");
    throw e;
}

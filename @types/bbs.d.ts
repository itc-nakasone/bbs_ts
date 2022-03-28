import {ICategory} from "../models/Category.js";
import {IUser} from "../models/User.js";
import {IMessage} from "../models/Message.js";
import {IThread} from "../models/Thread.js";

declare module "express-session" {
    interface SessionData {
        refUrl?: string | undefined;
    }
}

interface Locals {
    categories?: Array<ICategory>;
    category?: ICategory;
    currentUser?: Express.User | IUser | undefined;
    error?: any;
    loggedIn?: boolean;
    messages?: Array<IMessage>;
    redirect?: string | undefined;
    threads?: Array<IThread>;
    thread?: IThread;
    skip?: boolean;
}

declare module "express" {
    export interface Response {
        locals: Locals
    }
}

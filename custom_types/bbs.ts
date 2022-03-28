import type {ICategory} from "../models/Category.js";
import type {IUser} from "../models/User.js";
import type {IMessage} from "../models/Message.js";
import type {IThread} from "../models/Thread.js";

declare global {
    namespace Express {
        export interface Request {
            skip?: boolean | undefined;
        }
    }
}
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
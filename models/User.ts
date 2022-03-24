import type {PassportLocalDocument, PassportLocalSchema} from "mongoose";
import mongoose from "mongoose";
import passport from "passport-local-mongoose";

type _User = IUser;
declare global {
    namespace Express {
        interface User extends _User {
        }
    }
}

export interface IUser extends PassportLocalDocument {
    username: string;
    view_name: string;
}

const schema: PassportLocalSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z][a-zA-Z0-9]*$/,
    },
    view_name: {
        type: String,
        required: true,
        unique: true,
    },
});

schema.plugin(passport);

export const User = mongoose.model<IUser>("User", schema);

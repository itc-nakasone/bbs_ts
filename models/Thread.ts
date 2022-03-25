import type {Document, Model} from "mongoose";
import mongoose from "mongoose";
type Schema = mongoose.Schema;
const {model, Schema} = mongoose;
import type {ICategory} from "./Category";
import type {IUser} from "./User";

export interface IThread extends Document {
    title: string;
    category: ICategory["_id"];
    owner: IUser["_id"];
}

const schema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

export const Thread: Model<IThread> = model<IThread>("Thread", schema);
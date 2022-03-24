import type {Document, Model, Schema} from "mongoose";
import mongoose from "mongoose";

export interface ICategory extends Document {
    serial: number;
    name: string;
}

const schema: Schema = new mongoose.Schema({
    serial: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export const Category: Model<ICategory> = mongoose.model<ICategory>("Category", schema);
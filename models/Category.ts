import type {Document, Model} from "mongoose"
import mongoose from "mongoose";
type Schema = mongoose.Schema;
const {model, Schema} = mongoose;


export interface ICategory extends Document {
    serial: number;
    name: string;
}

const schema: Schema = new Schema({
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

export const Category: Model<ICategory> = model<ICategory>("Category", schema);
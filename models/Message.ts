import type {Document, Model} from "mongoose";
import mongoose from "mongoose";
type Schema = mongoose.Schema;
const {model, Schema, SchemaTypes} = mongoose;
import type {IUser} from "./User.js";
import type {IThread} from "./Thread.js";
import {Thread} from "./Thread.js";
import dateFormat, {i18n} from "dateformat";

i18n.dayNames = [
    "日", "月", "火", "水", "木", "金", "土",
    "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日",
];

export interface IMessage extends Document {
    serial: number;
    content: string;
    user: IUser["_id"];
    thread: IThread["_id"];
    deleted: boolean;
    createdAt: Date;
    postedAt: string;
}

const schema: Schema = new Schema({
    serial: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
    },
    thread: {
        type: SchemaTypes.ObjectId,
        ref: "Thread",
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

schema.virtual("postedAt").get(function (this: IMessage): string {
    return dateFormat(this.createdAt, "yyyy/mm/dd(ddd) HH:MM:ss.l");
});

schema.pre("save", async function (this: IMessage, next) {
    try {
        const Message: Model<IMessage> = model("Message");
        const count = await Message.count({
            thread: this.thread,
        });
        this.serial = count + 1;
        next();
    } catch (e) {
        next(e as any);
    }
});

schema.post("save", async function (this: IMessage) {
    await Thread.findByIdAndUpdate(this.thread, {
        $set: {
            updatedAt: this.createdAt,
        },
    }).exec();
});

export const Message: Model<IMessage> = model<IMessage>("Message", schema);
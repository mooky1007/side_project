import { Schema } from 'mongoose';

const todoItem = new Schema(
    {
        key: { type: Schema.Types.Mixed, unique: true },
        content: { type: Schema.Types.Mixed },
        checked: { type: Schema.Types.Mixed },
    },
    { strict: false }
);

export default todoItem;

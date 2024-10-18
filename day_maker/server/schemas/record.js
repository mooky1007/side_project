import { Schema } from 'mongoose';

const recordItem = new Schema(
    {
        key: { type: Schema.Types.Mixed, unique: true },
        title: { type: Schema.Types.Mixed },
        emotion: { type: Schema.Types.Mixed },
        content: { type: Schema.Types.Mixed },
        checked: { type: Schema.Types.Mixed },
    },
    { strict: false }
);

export default recordItem;
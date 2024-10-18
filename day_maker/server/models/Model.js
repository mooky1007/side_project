import mongoose from 'mongoose';

import todoItem from '../schemas/todoItem.js';
import recordItem from '../schemas/record.js';

export const Todo = mongoose.model('todoItem', todoItem);
export const Record = mongoose.model('record', recordItem);

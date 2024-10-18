import express from 'express';
import cors from 'cors';
import './db.js';
import { Record, Todo } from './models/Model.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/severCheck', (req, res) => {
    res.send('1');
});

app.get('/todo', async (req, res) => {
    const result = await Todo.find();
    res.send(result);
});

app.get('/record', async (req, res) => {
    const result = await Record.find();
    res.send(result);
});

app.post('/create_todo', async (req, res) => {
    const { key, content, checked, type } = req.body;

    const todo = new Todo({
        key: key ? key : `todo_${new Date().getTime()}`,
        type: type,
        content,
        checked,
        lastDay: new Date().getTime(),
        createAt: new Date().getTime(),
        lastModifyAt: new Date().getTime(),
    });

    try {
        await todo
            .save()
            .then(() => {})
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        res.status(400);
    } finally {
        res.status(200).send(todo);
    }
});

app.post('/create_record', async (req, res) => {
    const { title, emotion, content, memo } = req.body;

    const todo = new Record({
        key: `record_${new Date().getTime()}`,
        title,
        emotion,
        content: content.replaceAll('\n', '<br />'),
        createdDate: new Date().getTime(),
        memo: memo.replaceAll(' ', ''),
    });

    try {
        await todo.save().catch((err) => {
            console.log(err);
        });
    } catch (error) {
        res.status(400);
    } finally {
        res.status(200).send();
    }
});

app.delete('/delete_todo', async (req, res) => {
    const { key } = req.query;
    await Todo.deleteOne({ key: key });
    res.status(200).send();
});

app.delete('/delete_record', async (req, res) => {
    const { key } = req.query;
    await Record.deleteOne({ key: key });
    res.status(200).send();
});

app.put('/update_todo', async (req, res) => {
    const { key, checked, content, lastDay, count } = req.body;
    await Todo.findOneAndUpdate(
        { key: key },
        {
            checked,
            lastDay,
            content,
            count,
        }
    );
    res.status(200).send();
});

app.put('/update_record', async (req, res) => {
    const { key, emotion, title, content, memo } = req.body;
    await Record.findOneAndUpdate(
        { key: key },
        {
            emotion,
            title,
            content: content.replaceAll('\n', '<br />'),
            memo: memo.replaceAll(' ', ''),
            lastModifyAt: new Date().getTime(),
        }
    );
    res.status(200).send();
});

app.listen(3001, () => {
    console.log(`listening port 3000`);
});

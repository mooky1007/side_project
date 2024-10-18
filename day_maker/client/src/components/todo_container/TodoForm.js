import axios from 'axios';
import React, { useState } from 'react';

const TodoForm = ({ type, setData }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content === '') return;
        const { data } = await axios.post('http://127.0.0.1:3001/create_todo', {
            type: type,
            content: content,
            checked: false,
        });
        setContent('');
        setData((prev) => [...prev, data]);
    };

    return (
        <form className="input_container" onSubmit={handleSubmit}>
            <input
                type="text"
                name="todo"
                id="todo"
                placeholder={type === 'dayTodo' ? '오늘 할일을 적어주세요.' : '매일 할일을 적어주세요.'}
                value={content}
                onChange={({ target: { value } }) => setContent(value)}
            />
            <button type="submit" className="btn">
                작성
            </button>
        </form>
    );
};

export default TodoForm;

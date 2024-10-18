import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TodoItem from './TotoItem';

const TodoList = ({ type, data, setData }) => {
    useEffect(() => {
        try {
            getTodoList();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getTodoList = () => {
        axios.get('http://127.0.0.1:3001/todo').then((res) => {
            const { data } = res;
            setData(data);
        });
    };

    const deleteTodo = async (key) => {
        const { status } = await axios.delete(`http://127.0.0.1:3001/delete_todo?key=${key}`);
        if (status === 200) setData((prev) => prev.filter((el) => el.key !== key));
    };
    const updateTodo = async (key, data) => {
        const { status } = await axios.put(`http://127.0.0.1:3001/update_todo`, data);
        if (status === 200)
            setData((prev) =>
                prev.map((el) => {
                    if (el.key === key) return data;
                    else return el;
                })
            );
    };

    return (
        <div className="list_wrap">
            <ul>
                {data
                    .sort((a, b) => (a.type === 'routine' ? -1 : 1))
                    .filter((el) => {
                        if (type === 'routine') {
                            return el.type === type;
                        } else {
                            return el;
                        }
                    })
                    .map((el) => (
                        <TodoItem key={el.key} data={el} type={type} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                    ))}
            </ul>
        </div>
    );
};

export default TodoList;

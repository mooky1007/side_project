import React, { useState } from 'react';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const TodoContainer = () => {
    const [sectionType, setSectionType] = useState('dayTodo');
    const [data, setData] = useState([]);

    return (
        <div className="todo_container">
            <TodoHeader type={sectionType} setType={setSectionType} />
            <TodoForm type={sectionType} setData={setData} />
            <TodoList type={sectionType} data={data} setData={setData} />
        </div>
    );
};

export default TodoContainer;

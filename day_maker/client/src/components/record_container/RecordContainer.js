import React, { useEffect, useState } from 'react';
import RecordHeader from './RecordHeader';
import RecordContent from './RecordContent';
import RecordList from './RecordList';
import RecordWrite from './RecordWrite';

const RecordContainer = () => {
    const changeContent = (type) => {
        setContent(contentList[type]);
        return contentList[type];
    };

    const [content, setContent] = useState('');

    const contentList = {
        list: { title: 'list', component: <RecordList mode="write" changeContent={changeContent} setContent={setContent} /> },
        write: { title: 'write', component: <RecordWrite changeContent={changeContent} /> },
    };

    useEffect(() => {
        setContent(contentList.list);
    }, []);

    return (
        <div className="record_container">
            <RecordHeader content={content} changeContent={changeContent} />
            <RecordContent content={content} />
        </div>
    );
};

export default RecordContainer;

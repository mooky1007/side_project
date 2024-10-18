import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RecordWrite from './RecordWrite';

const RecordList = ({ setContent, changeContent }) => {
    const [data, setData] = useState([]);

    const getRecordList = () => {
        axios.get('http://127.0.0.1:3001/record').then((res) => {
            const { data } = res;
            setData(data.sort((a, b) => b.createdDate - a.createdDate));
        });
    };

    useEffect(() => {
        try {
            getRecordList();
        } catch (error) {
            console.lor(error);
        }
    }, []);

    const deleteTodoItem = async (key) => {
        await axios.delete(`http://127.0.0.1:3001/delete_record?key=${key}`);
        getRecordList();
    };

    return (
        <div className="list_wrap">
            {data.length === 0 ? (
                <div className="no_record">
                    아직 기록이 없습니다.
                    <br />
                    기록을 작성해보세요.
                </div>
            ) : (
                <ul>
                    {data.map((li) => {
                        return (
                            <li key={li.key}>
                                <div className="title">
                                    <div className="emotion" style={{ backgroundImage: `url(./assets/images/${li.emotion}.png)` }}></div>
                                    <div className="title_text_box">
                                        <p>{li.title}</p>
                                        <span className="date">{new Date(li.createdDate).toLocaleDateString('kr')}</span>
                                    </div>
                                    <div className="button_wrap">
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                setContent({ title: 'edit', component: <RecordWrite changeContent={changeContent} mode="edit" data={li} /> });
                                            }}
                                        >
                                            수정
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => {
                                                deleteTodoItem(li.key);
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                                <div className="content">
                                    <p dangerouslySetInnerHTML={{ __html: li.content }} />
                                </div>
                                {li.memo === '' ? null : (
                                    <div className="memo">
                                        {li.memo.split(',').map((tag, idx) => {
                                            return <span key={idx}>#{tag}</span>;
                                        })}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default RecordList;

import React, { useState } from 'react';
import Layout from '../layouts/Layout';
import Hedaer from '../layouts/Hedaer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateRecord = ({ title, back = false }) => {
    const [selectedEmotion, setSelectedEmotion] = useState('emotion01');
    const [record_title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [memo, setMemo] = useState('');

    const navigate = useNavigate();

    const handleRecordSubmit = async () => {
        if (record_title === '') return;
        if (content === '') return;

        await axios.post('http://127.0.0.1:3001/create_record', {
            title: record_title,
            emotion: selectedEmotion,
            content: content,
            memo: memo,
        });

        navigate('/');
    };

    return (
        <Layout className="write">
            <Hedaer title={title} back={back} />
            <div className="container">
                <div className="emotion_container">
                    <span className="emotion_title">오늘의 감정</span>
                    <ul>
                        {new Array(6).fill('').map((_, idx) => (
                            <EmotionItem
                                id={`emotion0${idx + 1}`}
                                selectedEmotion={selectedEmotion}
                                setSelectedEmotion={setSelectedEmotion}
                                key={idx}
                            />
                        ))}
                    </ul>
                </div>
                <div className="input_container">
                    <form
                        className="content"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleRecordSubmit();
                        }}
                    >
                        <div className="row">
                            <span className="input_title">제목</span>
                            <input type="text" name="title" id="title" value={record_title} onChange={({ target: { value } }) => setTitle(value)} />
                        </div>
                        <div className="row">
                            <span className="input_title">내용</span>
                            <textarea name="content" id="content" value={content} onChange={({ target: { value } }) => setContent(value)}></textarea>
                        </div>
                        <div className="row">
                            <span className="input_title">한줄기록</span>
                            <input type="text" name="memo" id="memo" value={memo} onChange={({ target: { value } }) => setMemo(value)} />
                        </div>
                        <div className="row">
                            <button type="submit" id="saveDailyBtn">
                                저장
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CreateRecord;

const EmotionItem = ({ id, selectedEmotion, setSelectedEmotion }) => {
    return (
        <li>
            <input
                type="radio"
                name="emotion"
                value={id}
                id={id}
                checked={selectedEmotion === id}
                onChange={() => {
                    setSelectedEmotion(id);
                }}
            />
            <label htmlFor={id}>
                <img src={`./assets/images/${id}.png`} alt="" style={id === 'emotion05' ? { position: 'relative', bottom: '5px' } : null} />
            </label>
        </li>
    );
};

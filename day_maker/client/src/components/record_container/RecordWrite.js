import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RecordWrite = ({ mode, data, changeContent }) => {
    const [emotion, setEmotion] = useState('emotion01');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [memo, setMemo] = useState('');

    useEffect(() => {
        if (mode === 'edit') {
            setEmotion(data.emotion);
            setTitle(data.title);
            setContent(data.content.replaceAll('<br />', '\n'));
            setMemo(data.memo);
        }
    }, [mode]);

    const handleSubmit = () => {
        if (mode !== 'edit') {
            createRecord({
                emotion,
                title,
                content,
                memo,
            });
        } else {
            updateRecord({
                key: data.key,
                emotion,
                title,
                content,
                memo,
            });
        }
    };

    const createRecord = async (data) => {
        await axios.post('http://127.0.0.1:3001/create_record', data);
        changeContent('list');
    };

    const updateRecord = async (data) => {
        await axios.put('http://127.0.0.1:3001/update_record', data);
        changeContent('list');
    };

    return (
        <div className="record_edit_container">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="emotion_row">
                    <div className="row_title">
                        <p>오늘 기분은 어떤가요?</p>
                    </div>
                    <div className="radio_group">
                        <div className="radio_item">
                            <input
                                type="radio"
                                name="emotion"
                                id="emotion01"
                                checked={emotion === 'emotion01'}
                                onChange={() => {
                                    setEmotion('emotion01');
                                }}
                            />
                            <label htmlFor="emotion01">
                                <span className="blind">행복</span>
                            </label>
                        </div>
                        <div className="radio_item">
                            <input
                                type="radio"
                                name="emotion"
                                id="emotion02"
                                checked={emotion === 'emotion02'}
                                onChange={() => {
                                    setEmotion('emotion02');
                                }}
                            />
                            <label htmlFor="emotion02">
                                <span className="blind">기쁨</span>
                            </label>
                        </div>
                        <div className="radio_item">
                            <input
                                type="radio"
                                name="emotion"
                                id="emotion03"
                                checked={emotion === 'emotion03'}
                                onChange={() => {
                                    setEmotion('emotion03');
                                }}
                            />
                            <label htmlFor="emotion03">
                                <span className="blind">좋음</span>
                            </label>
                        </div>
                        <div className="radio_item">
                            <input
                                type="radio"
                                name="emotion"
                                id="emotion04"
                                checked={emotion === 'emotion04'}
                                onChange={() => {
                                    setEmotion('emotion04');
                                }}
                            />
                            <label htmlFor="emotion04">
                                <span className="blind">우울</span>
                            </label>
                        </div>
                        <div className="radio_item">
                            <input
                                type="radio"
                                name="emotion"
                                id="emotion05"
                                checked={emotion === 'emotion05'}
                                onChange={() => {
                                    setEmotion('emotion05');
                                }}
                            />
                            <label htmlFor="emotion05">
                                <span className="blind">슬픔</span>
                            </label>
                        </div>
                        <div className="radio_item">
                            <input
                                type="radio"
                                name="emotion"
                                id="emotion06"
                                checked={emotion === 'emotion06'}
                                onChange={() => {
                                    setEmotion('emotion06');
                                }}
                            />
                            <label htmlFor="emotion06">
                                <span className="blind">화남</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="title_row">
                    <div className="row_title">
                        <p>제목</p>
                    </div>
                    <div className="input_group">
                        <input type="text" value={title} onChange={({ target: { value } }) => setTitle(value)} />
                    </div>
                </div>
                <div className="content_row">
                    <div className="row_title">
                        <p>내용</p>
                    </div>
                    <div className="input_group">
                        <textarea value={content} onChange={({ target: { value } }) => setContent(value)}></textarea>
                    </div>
                </div>
                <div className="memo_row">
                    <div className="row_title">
                        <p>메모</p>
                    </div>
                    <div className="input_group">
                        <input type="text" value={memo} onChange={({ target: { value } }) => setMemo(value)} />
                    </div>
                </div>
                <button type="submit">{mode === 'edit' ? '저장' : '작성하기'}</button>
            </form>
        </div>
    );
};

export default RecordWrite;

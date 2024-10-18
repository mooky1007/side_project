import React, { useState } from 'react';
const RecordHeader = ({ content, changeContent }) => {
    return (
        <div className="container_title">
            {content.title !== 'list' ? (
                <>
                    <button
                        className="btn back_btn"
                        onClick={() => {
                            changeContent('list');
                        }}
                    />
                    <h2>기록</h2>
                </>
            ) : (
                <h2>기록하기</h2>
            )}
            {content.title === 'list' && (
                <div className="button_wrap">
                    <button
                        className="btn"
                        onClick={() => {
                            changeContent('write');
                        }}
                    >
                        기록하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecordHeader;

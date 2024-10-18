import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ModeContext = createContext();

const Layout = ({ children, className = '' }) => {
    const [mode, setMode] = useState('local');

    const dataModeCheck = async () => {
        try {
            const result = await axios.get('http://127.0.0.1:3001/severCheck');
            console.log('저장소가 확인되어 서버모드로 변경합니다.');
            setMode('server');
        } catch (err) {
            console.log('저장소가 확인되지 않습니다. 로컬모드로 진행합니다.');
            setMode('local');
        }
    };

    useEffect(() => {
        dataModeCheck();
    }, []);

    return (
        <ModeContext.Provider value={mode}>
            <div className={`wrapper ${className}`}>{children}</div>
        </ModeContext.Provider>
    );
};

export default Layout;

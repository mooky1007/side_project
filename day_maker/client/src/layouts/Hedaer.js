import React from 'react';
import { Link } from 'react-router-dom';

const Hedaer = (props) => {
    const { title, back } = props;
    return (
        <header className="header_container">
            <div className="inner">
                {back && <Link to="/" className="back_btn btn" />}
                <h1>{title}</h1>
                <div className="date">{new Date().toLocaleDateString('kr')}</div>
            </div>
        </header>
    );
};

export default Hedaer;

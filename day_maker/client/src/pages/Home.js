import React, { useEffect, useState } from 'react';

import Hedaer from '../layouts/Hedaer';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
import TodoContainer from '../components/todo_container/TodoContainer';
import RecordContainer from '../components/record_container/RecordContainer';

// import logo from './logo.svg';
const Home = ({ title }) => {
    return (
        <Layout className="home">
            <Hedaer title={title} />
            <div className="container">
                <TodoContainer />
                <RecordContainer />
            </div>
        </Layout>
    );
};

export default Home;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import CreateRecord from './pages/CreateRecord';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home title={'일상 기록'} />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

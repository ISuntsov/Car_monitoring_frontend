import React from 'react';
import './loader.css';

const Loader = () => {
    return (
        <div className="skeleton-loader clearfix w-full">
            <div className="skeleton-1">Загрузка</div>
            <div className="skeleton-2"/>
            <div className="skeleton-3"/>
        </div>
    );
};

export default Loader;

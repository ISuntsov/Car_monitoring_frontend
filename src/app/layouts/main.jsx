import React from 'react';
import startImage from '../img/car-service.png';

const Main = () => {
    return (
        <div className="container mx-auto max-w-[600px] pt-5">
            <div className="relative w-full">
                <img
                    className="absolute inset-0 object-cover w-full"
                    src={startImage}
                    alt=""
                />
            </div>
        </div>
    );
};

export default Main;

import React, { useContext } from 'react';
import { ErrorContext } from '../context/ErrorContext';

export const ErrorNotification = () => {
    const { error } = useContext(ErrorContext);


    if (!error) return null;

    return (
        <div className="error">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}> Try again! </button>
        </div>
    );
};


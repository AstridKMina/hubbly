import React, { useContext } from 'react';
import { ErrorContext } from '../../context/ErrorContext';
import styles from "./ErrorNotification.module.css";

export const ErrorNotification = () => {
    const { error } = useContext(ErrorContext);


    if (!error) return null;

    return (
        <div className={styles.error}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}> Try again! </button>
        </div>
    );
};


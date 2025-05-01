import React, { useContext } from 'react';
import { ErrorContext } from '../../context/ErrorContext';
import styles from './ErrorNotification.module.css';

export const ErrorNotification = () => {
  const { error } = useContext(ErrorContext);

  if (!error) return null;

  return (
    <section className={styles.error} role="alert">
      <p id="error-message">{error}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        aria-describedby="error-message"
      >
        Try again!
      </button>
    </section>
  );
};
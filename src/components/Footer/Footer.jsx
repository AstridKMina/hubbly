import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <p>© {new Date().getFullYear()} Hubbly. All rights reserved.</p>
        </div>
        <nav className={styles.footerSocials} aria-label="Social media links">
          <a
            href="https://github.com/AstridKMina/hubbly"
            aria-label="Visit Hubbly on GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className={styles.icon} />
          </a>
          <a
            href="https://www.linkedin.com/in/astrid-mina/"
            aria-label="Visit Astrid Mina on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
          </a>
        </nav>
      </div>
    </footer>
  );
};
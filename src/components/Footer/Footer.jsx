import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';


export const Footer = () => {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <p> 🤩 &copy; {new Date().getFullYear()} Hubbly. All rights reserved.</p>
        </div>

        {/* <nav className={styles.footerNav}>
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </nav> */}

        <div className={styles.footerSocials}>
          <a href="https://github.com/AstridKMina/hubbly" aria-label="Github"><FontAwesomeIcon icon={faGithub} className={styles.icon}/></a>
          <a href="https://www.linkedin.com/in/astrid-mina/" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} className={styles.icon}/></a>
        </div>
      </div>
    </footer>
  );
};
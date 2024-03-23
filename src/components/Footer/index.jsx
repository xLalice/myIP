import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <FontAwesomeIcon icon={faLocationDot} color="#fff1d0" />
      <p>Get your location information</p>
      <a href="https://github.com/gtcore902/myIP-frontend">
        <FontAwesomeIcon icon={faGithub} size="lg" color="#fff1d0" />
      </a>
    </div>
  );
};

export default Footer;

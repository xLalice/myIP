import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <FontAwesomeIcon icon={faLocationDot} size="lg" color="#f46c2b" />
      <p>Get your location information</p>
      <a
        aria-label="Link to the github project"
        href="https://github.com/gtcore902/myIP-frontend"
      >
        <FontAwesomeIcon icon={faGithub} size="lg" color="#f46c2b" />
      </a>
    </div>
  );
};

export default Footer;

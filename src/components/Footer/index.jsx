import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import GitShare from '../GitShare';

import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <FontAwesomeIcon icon={faLocationDot} size="lg" color="#f46c2b" />
      <p>Get your location information</p>
      <GitShare size="lg" color="#f46c2b" />
    </div>
  );
};

export default Footer;

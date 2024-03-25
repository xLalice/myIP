import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        <FontAwesomeIcon icon={faLocationDot} size="lg" color="#f46c2b" />
        <h1>
          Get your <span className="hight-light">location</span> information
        </h1>
      </div>
      <nav>
        <ul className="header__nav">
          <li className="header__nav__link">
            <a
              aria-label="Link to the github project"
              href="https://github.com/gtcore902/myIP-frontend"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" color="#f46c2b" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

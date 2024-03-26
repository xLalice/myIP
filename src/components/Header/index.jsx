import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import GitShare from '../GitShare';
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
            <GitShare tag="Fork me" size="lg" color="#f46c2b" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

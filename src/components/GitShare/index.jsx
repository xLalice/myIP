import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './GitShare.scss';

const GitShare = ({ tag, size, color }) => {
  return (
    <div>
      <a
        aria-label="Link to the github project"
        href="https://github.com/gtcore902/myIP-frontend"
      >
        {tag && <span>{tag}</span>}
        <FontAwesomeIcon icon={faGithub} size={size} color={color} />
      </a>
    </div>
  );
};

export default GitShare;

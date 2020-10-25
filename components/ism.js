import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export default function Ism({ ism }) {
  return (
    <div className="ism">
      <div className="front inside">
        <div className="content">
          <span>{ism.text}</span>
        </div>
        <footer>
          <FontAwesomeIcon icon={faHeart} className="icon upvote" />
          <FontAwesomeIcon icon={faThumbsDown} className="icon downvote" />
        </footer>
      </div>
      {/* <div className="back">
                  <div>Contributor</div> <div>{ism.contributor}</div>
                  <div>Source</div> <div>{ism.source}</div>
                </div>
                */}
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export default function Ism({ ism }) {

  const ab = () => Math.floor(Math.random() * 2);
  const placement = ab() ? 'inside' : 'outside';
  const color = ab() ? 'green' : 'grey';

  return (
    <div className="ism">
      <div className={`front ${placement} ${color}`}>
        <div className="content">
          <span><pre>{ism.text}</pre></span>
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

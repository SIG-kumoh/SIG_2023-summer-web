import './TopicCard.css'
import {Topic} from "../../config/config";
import {Link} from "react-router-dom";

export default function TopicCard(topic:Topic) {
    return(
        <Link to={`/topic-page/${topic.topic_id}`}>
            <div className="card_body">
                <div className="card_body_left">
                    <img className="card_body_img" src={topic.title_img} alt="이미지 없음" />
                </div>
                <div className="card_body_right">
                    <span className="topic_title">
                        {topic.title}
                    </span>
                </div>
            </div>
        </Link>
    )
}
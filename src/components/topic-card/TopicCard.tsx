import {Topic} from "../../config/config";
import {Link} from "react-router-dom";

export default function TopicCard(topic:Topic) {
    return(
        <Link to={`/topic-page/${topic.clusterId}`}>
            <div className="card_body">
                <div className="card_body_left">
                    <img className="card_body_img" src={topic.imgUrl} alt="이미지 없음" />
                </div>
                <div className="card_body_right">
                    <div className="topic_title">
                        {topic.title}
                    </div>
                    <div className="topic_summary">
                        {topic.summary}
                    </div>
                    <div className="topic_word_block">
                        {topic.words.map((e) =>
                            <div className="topic_words">
                                #{e}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
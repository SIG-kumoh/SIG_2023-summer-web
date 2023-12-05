import {BaseURL, Topic} from "../../config/config";
import {Link} from "react-router-dom";
import {usePageStore} from "../../store";

export default function TopicCard(topic:Topic) {
    const {authority, authorization} = usePageStore()

    const alertConfirm = (e: React.MouseEvent) => {
        e.preventDefault()
        if(window.confirm("토픽 \"" + topic.title + "\"을/를 정말 삭제하시겠습니까?")) {
            deleteTopic()
        } else {
        }
    }
    const deleteTopic = () => {
        fetch(BaseURL + "/news/cluster?cid=" + topic.clusterId, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": authorization
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                alert("삭제되었습니다.")
                window.location.reload()
            } else {
                alert("삭제에 실패했습니다.")
            }
        }).catch(err => {
            alert("삭제에 실패했습니다.")
        })
    }
    return(
        <div className='topic_card_container'>
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
                            {topic.words.map((e, idx) =>
                                <div className="topic_words" key={idx}>
                                    #{e}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
            {authority === 'admin' ? <button onClick={e => alertConfirm(e)} className="admin_delete_button">🗑️</button> : <></>}
        </div>
    )
}
import GetServerData, {BaseURL, Topic, News} from "../../config";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";
import './TopicDetailCard.css'

export default function TopicDetailCard() {
    const topic_id = useParams()
    const reqURL = BaseURL + "/news/" + topic_id.topicId
    const {data, isLoading, isError} = useQuery(["news", topic_id], () => GetServerData(reqURL))
    if (isLoading || isError) {
        return(
            <h2>서버로부터 응답이 없습니다</h2>
        )
    }
    else {
        const topic:Topic = data.topic
        const news:Array<News> = data.news
        return(
            <div className="detail_card">
                <div className="topic_title">{topic.title}</div>
                <div className="topic_img_container">
                    <img className="topic_img" src={topic.title_img} alt={"이미지 없음"}/>
                </div>
                <div className="topic_summary">요약</div>
                <div className="topic_summary_content">{topic.summary.length === 0 ? "요약문 없음" : topic.summary}</div>
                <div className="news_container">
                    관련 기사
                    <ul>
                        {news.map((i:News) => (
                            <li className="news" key={i.url}>
                                <Link to={i.url} target="_blank">
                                    <span className="news_title">{i.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}
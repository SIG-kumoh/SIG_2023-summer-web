import GetServerData, {BaseURL, Topic, News} from "../../config/config";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";

const dummyData:Topic = {
    title: "[오늘날씨] 낮 최고 '28도' 초여름 날씨…중부지방은 구름 많아",
    summary: "목요일인 2일 오전 남부내륙 중심으로 짙은 안개가 끼는 곳이 있겠고, 중부지방 하늘은 가끔 구름 많겠다. 이날 기상청 등에 따르면 오전까지 충북남부와 남부내륙에는 가시거리 200m 미만의 짙은 안개가, 그 밖의 지역에는 가시거리 1㎞ 미만의 안개가 끼는 곳이 있겠다.",
    title_img: "https://imgnews.pstatic.net/image/031/2023/11/02/0000784334_001_20231102083301075.jpg?type=w647",
    topic_id: 0
}

export default function TopicDetailCard() {
    const topic_id = useParams()
    const reqURL = BaseURL + "/news/" + topic_id.topicId
    const {data, isLoading, isError} = useQuery(["news", topic_id], () => GetServerData(reqURL))
    return(
        <div className="detail_card">
            <div className="topic_img_container">
                <img className="topic_img" src={dummyData.title_img} alt={"이미지 없음"}/>
            </div>
            <div className="topic_text">
                <div className="topic_title">{dummyData.title}</div>
                <div className="topic_summary_content">{dummyData.summary.length === 0 ? "요약문 없음" : dummyData.summary}</div>
            </div>
        </div>
    )

    /*if (isLoading || isError) {
        return(
            <h2>서버로부터 응답이 없습니다</h2>
        )
    } else {
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
    }*/
}
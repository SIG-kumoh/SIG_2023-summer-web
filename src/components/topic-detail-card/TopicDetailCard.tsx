import {GetServerData, BaseURL, Topic, News} from "../../config/config";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "react-query";

const dummyData:Topic = {
    title: "서버로부터 응답이 없습니다",
    summary: "",
    imgUrl: "",
    clusterId: 0,
    chatNamespace: "",
    relatedClusterId: 0,
    articleList:[]
}

export default function TopicDetailCard(title:string, imgUrl:string, summary:string) {
    return(
        <div className="detail_card">
            <div className="topic_img_container">
                <img className="topic_img" src={imgUrl} alt={"이미지 없음"}/>
            </div>
            <div className="topic_text">
                <div className="topic_title">{title}</div>
                <div className="topic_summary_content">{summary.length === 0 ? "요약문 없음" : summary}</div>
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
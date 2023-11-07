import { Link } from "react-router-dom";
import {News} from "../../config/config";


export default function TopicNews(news:Array<News>) {
    return(
        <div className="news_container">
            <ul>
                {news.map((i:News) => (
                    <li className="news" key={i.url}>
                        <Link to={i.url} target="_blank">
                            <NewsCard title={i.title} url={i.url} imgUrl={i.imgUrl} regdate={i.regdate} press={i.press} content={i.content}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function NewsCard(data:News) {
    return(
        <div className="news_card">
            <div className="news_img_box">
                <img src={data.imgUrl}/>
            </div>
            <div className="news_text_box">
                <div className="news_title">{data.title}</div>
                <div className="news_content">{data.content}</div>
                <div className="news_under_box">
                    <div className="news_press">{data.press}</div>
                    <div className="news_date">{data.regdate}</div>
                </div>
            </div>
        </div>
    )
}
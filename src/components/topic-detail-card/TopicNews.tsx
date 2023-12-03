import { Link } from "react-router-dom";
import {GetTodayDateAndTime, News} from "../../config/config";
import React from "react";


export default function TopicNews(page: number, itemsCountPerPage: number, news:Array<News>) {
    return(
        <div className="news_container">
            <ul>
                {createTopicNews(page, itemsCountPerPage, news)}
            </ul>
        </div>
    )
}

function createTopicNews(page: number, itemsCountPerPage:number, data: Array<News>) {
    const result = []

    for (let i = (page - 1) * itemsCountPerPage; i < page * itemsCountPerPage && i < data.length; i++) {
        const news = data[i]
        
        result.push(
            <li className="news" key={news.url}>
                <Link to={news.url} target="_blank">
                    <NewsCard title={news.title} url={news.url} imgUrl={news.imgUrl} regdate={news.regdate} press={news.press} content={news.content}/>
                </Link>
            </li>
        )
    }
    
    return result
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
                    <div className="news_date">{GetTodayDateAndTime(data.regdate)}</div>
                </div>
            </div>
        </div>
    )
}
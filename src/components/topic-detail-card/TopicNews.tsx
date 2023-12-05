import { Link } from "react-router-dom";
import {BaseURL, GetTodayDateAndTime, News} from "../../config/config";
import React from "react";
import {loginStore} from "../../store";


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
                    <NewsCard key={news.articleId} title={news.title} url={news.url} imgUrl={news.imgUrl} regdate={news.regdate} press={news.press} content={news.content} articleId={news.articleId}/>
                </Link>
            </li>
        )
    }
    
    return result
}

function NewsCard(data:News) {
    const {authority, authorization} = loginStore()
    const alertConfirm = (e: React.MouseEvent) => {
        e.preventDefault()
        if(window.confirm("뉴스기사 \"" + data.title + "\"을/를 정말 삭제하시겠습니까?")) {
            deleteTopic()
        } else {
        }
    }
    const deleteTopic = () => {
        fetch(BaseURL + "/news/article?aid=" + data.articleId, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": authorization
            }
        }).then(res => {
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
            {authority === 'admin' ? <button onClick={e => alertConfirm(e)} className="admin_delete_button">🗑️</button> : <></>}
        </div>
    )
}
import React from "react";
import {Link} from "react-router-dom";
import {GetTodayDateAndTime, Node} from "../../config/config";

export default function TopicNode(data: Node) {
    if(data.idx===0) {
        return(
            <div className="first_news">
                <div className="news_regdate">
                    {GetTodayDateAndTime(data.regdate).substring(0, 10)}
                </div>
                <div className="news_title">
                    {data.title}
                </div>
                <div className="topic_block">
                    {data.topic.map((e: string, index:number) =>
                        <div className="news_topic" key={index}>
                            {e}
                        </div>
                    )}
                </div>
            </div>
        )
    }
    return (
        <Link to={`/topic-page/${data.id}`}>
            <div className="news_info">
                <div className="news_regdate">
                    {GetTodayDateAndTime(data.regdate).substring(0, 10)}
                </div>
                <div className="news_title">
                    {data.title}
                </div>
                <div className="topic_block">
                    {data.topic.map((e: string, index:number) =>
                        <div className="news_topic" key={index}>
                            {e}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}


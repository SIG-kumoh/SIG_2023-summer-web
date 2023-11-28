import React from "react";
import {Link} from "react-router-dom";
import {Node} from "../../config/config";

export default function TopicNode(data: Node) {
    return (
        <Link to={`/topic-page/${data.id}`}>
            <div className="news_info">
                <div className="news_title">
                    {data.title}
                </div>
                <div className="news_regdate">
                    {data.regdate}
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
import React from "react";
import {Link} from "react-router-dom";

interface Node {
    id: number, title: string, regdate:string, topic: Array<string>
}

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
                    {data.topic.map((e: string) =>
                        <div className="news_topic">
                            {e}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}
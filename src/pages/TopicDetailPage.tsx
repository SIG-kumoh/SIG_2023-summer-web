import TopicDetailCard from "../components/topic-detail-card/TopicDetailCard";
import React from "react";
import TopicNews from "../components/topic-detail-card/TopicNews";
import RelationNews from "../components/topic-detail-card/RelationNews";

export default function TopicDetailPage() {
    return(
        <div className="container">
            <TopicDetailCard />
            <div className="topic_detail_under">
                <div className="topic_detail_left">
                    <TopicNews/>
                </div>
                <div className="topic_detail_right">
                    <RelationNews/>
                </div>
            </div>
        </div>
    )
}


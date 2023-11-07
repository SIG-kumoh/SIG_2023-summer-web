import TopicDetailCard from "../components/topic-detail-card/TopicDetailCard";
import React from "react";
import TopicNews from "../components/topic-detail-card/TopicNews";
import RelationNews from "../components/topic-detail-card/RelationNews";
import {useParams} from "react-router-dom";
import {BaseURL, GetServerData} from "../config/config";
import {useQuery} from "react-query";

export default function TopicDetailPage() {
    const topic_id = useParams()
    const reqURL = BaseURL + "/news/cluster?cid=" + topic_id.topicId
    console.log(reqURL)
    const {data, isLoading, isError} = useQuery([topic_id], () => GetServerData(reqURL))
    if (isLoading || isError) {
        return(
            <div className="container">
                <div className="category_name">
                    서버로부터 응답이 없습니다.
                </div>
            </div>
        )
    }
    return(
        <div className="container">
            {TopicDetailCard(data.title, data.imgUrl, data.summary)}
            <div className="topic_detail_under">
                <div className="topic_detail_left">
                    {TopicNews(data.articleList)}
                </div>
                <div className="topic_detail_right">
                    <RelationNews/>
                </div>
            </div>
        </div>
    )
}


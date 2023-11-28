import TopicDetailCard from "../components/topic-detail-card/TopicDetailCard";
import React, {useCallback, useEffect, useState} from "react";
import TopicNews from "../components/topic-detail-card/TopicNews";
import RelationNews from "../components/topic-detail-card/RelationNews";
import {useLocation, useParams} from "react-router-dom";
import {BaseURL, GetServerData} from "../config/config";
import {useQuery} from "react-query";
import Paging from "../components/page/Paging";
import Chat from "../components/chat/Chat";

export default function TopicDetailPage() {
    const topic_id = useParams()
    const reqURL = BaseURL + "/news/cluster?cid=" + topic_id.topicId
    const {data, isLoading, isError} = useQuery([topic_id], () => GetServerData(reqURL))
    const [page, setPage] = useState<number>(1)
    const changePage = useCallback((page: number) => {setPage(page)}, [])
    const location = useLocation()
    let room_name = ""
    if(location.search.length !== 0) {
        room_name = location.search.split("=")[1]
    }
    const itemsCountPerPage = 7

    useEffect(() => {
        setPage(1)
    }, [location]);

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
            {TopicDetailCard(data.title, data.imgUrl, data.summary, data.words)}
            <div className="topic_detail_under">
                <div className="topic_detail_left">
                    {TopicNews(page, itemsCountPerPage, data.articleList)}
                    {data.length === 0 ? <></> :
                        <Paging page={page} count={data.articleList.length} itemsCountPerPage={itemsCountPerPage} setPage={changePage}></Paging> }
                </div>
                <div className="topic_detail_right">
                    {room_name.length !== 0 ? <Chat room_name={room_name}/> : <></>}
                    <RelationNews nodes={data.relatedClusters}/>
                </div>
            </div>
        </div>
    )
}


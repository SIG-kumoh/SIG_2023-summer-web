import GetServerData, {BaseURL, Categories, Detail, Topic} from "../config";
import TopicCard from "../components/topic-card/TopicCard";
import {useQuery} from 'react-query';
import {usePageStore} from "../store";
import React, {useCallback, useState} from "react";
import Paging from "../components/page/Paging";

const dummyTopic:Topic = {
    title: "서버로부터 응답이 없습니다",
    summary: "",
    title_img: "",
    topic_id: 0
}


export default function TopicPage() {
    const {cur} = usePageStore()
    const detail:Detail = Categories[cur]
    const reqURL = BaseURL + "/topic" + detail.toServer + '?t_date=2023-08-14'
    const {data, isLoading, isError} =
        useQuery(['topic', detail.name], () => GetServerData(reqURL))
    const [page, setPage] = useState<number>( 1)
    const changePage = useCallback((page:number) => setPage(page), [])
    if (isLoading || isError) {
        return(
            <div className="container">
                <div className="category_name">{detail.name}</div>
                {TopicCard(dummyTopic)}
            </div>
        )
    }
    return (
        <div className="container">
            <div className="category_name">{detail.name}</div>
            {data.topics.map((info: Topic) => (
                <TopicCard key={info.topic_id} title={info.title} summary={info.summary} title_img={info.title_img}
                           topic_id={info.topic_id}/>
            ))}
            <Paging page={page} count={data.topics.length} setPage={changePage}></Paging>
        </div>
    )
}


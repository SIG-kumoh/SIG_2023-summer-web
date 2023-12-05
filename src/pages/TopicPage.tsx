import {GetServerData, BaseURL, Categories, Detail, Topic, GetTodayDate, Loading} from "../config/config";
import TopicCard from "../components/topic-card/TopicCard";
import {useQuery} from 'react-query';
import {usePageStore} from "../store";
import React, {useCallback, useEffect, useState} from "react";
import Paging from "../components/page/Paging";
import {useLocation} from "react-router-dom";

const dummyTopic:Topic = {
    title: "서버로부터 응답이 없습니다",
    summary: "",
    imgUrl: "",
    clusterId: 0,
    chatNamespace:"",
    articleList: [],
    relatedClusterId: 0,
    size: 0,
    words: []
}


export default function TopicPage() {
    const {cur} = usePageStore()
    const detail:Detail = Categories[cur]
    const reqURL = BaseURL + "/news/section?sid=" + detail.section_id + "&date=" + GetTodayDate()
    const {data, isLoading, isError} =
        useQuery(['topic', detail.name], () => GetServerData(reqURL))
    const [page, setPage] = useState<number>( 1)
    const changePage = useCallback((page:number) => setPage(page), [])
    const location = useLocation()
    const itemsCountPerPage = 7

    function createTopicCard(page: number, data: any) {
        const result = []

        for (let i = (page - 1) * itemsCountPerPage; i < page * itemsCountPerPage && i < data.length; i++) {
            result.push(
                <TopicCard key={data[i].clusterId} title={data[i].title} summary={data[i].summary} imgUrl={data[i].imgUrl} clusterId={data[i].clusterId}
                           chatNamespace={data[i].chatNamespace} relatedClusterId={data[i].relatedClusterId} articleList={data[i].articleList} size={data.size} words={data[i].words} />
            )
        }

        return result
    }

    useEffect(() => {
        setPage(1)
    }, [location]);
    if(isLoading) {
        return(
            <div className="container">
                <div className="category_name">{detail.name}</div>
                <Loading/>
            </div>
        )
    }
    if (isError) {
        return(
            <div className="container">
                <div className="category_name">{detail.name}</div>
                <div className="category_name">서버로부터 응답이 없습니다</div>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="category_name">{detail.name}</div>
            <div className="topic_cards">
                {createTopicCard(page, data)}
            </div>
            {data.length === 0 ? <></> :
            <Paging page={page} count={data.length} itemsCountPerPage={itemsCountPerPage} setPage={changePage}></Paging> }
        </div>
    )
}


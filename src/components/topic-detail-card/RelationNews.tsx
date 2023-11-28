import RoadMap from "../road-map/RoadMap";
import React from "react";
import TopicNode from "../road-map/TopicNode";

const nodes = [
    { id: 94865, title: "바느질 나눔 봉사’ 김도순·곽경희씨 LG의인상", regdate: "2023-09-13", topic: ["이준석", "인요한", "부모"]},
    { id: 94866, title: "기적의 생환’ 봉화 광부 “다시, 첫 생일", regdate: "2023-09-01", topic: ["이준석", "국민의힘", "연설"]},
    { id: 94867, title: "등산로 순찰’ 인생 2막 연 퇴직 경찰", regdate: "2023-08-27", topic: ["응애", "제발", "여기까지"]},
];


export default function RelationNews () {
    return(
        <div className="relation_box">
            연관뉴스
            <div className="relation_news">
                {RoadMap(nodes.length)}
                <div className="info_block">
                    {nodes.map((e: any) =>
                        <TopicNode id={e.id} title={e.title} regdate={e.regdate} topic={e.topic}/>
                    )}
                </div>
            </div>
        </div>
    )
}

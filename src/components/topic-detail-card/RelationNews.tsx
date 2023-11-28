import {News} from "../../config/config";
import RoadMap from "../road-map/RoadMap";
import React from "react";

const exampleNews:News = {
    title:"공사중",
    imgUrl:"/img/오늘의 뉴스.png",
    regdate:"",
    url:"",
    press:"",
    content:""
}

export default function RelationNews () {
    return(
        <div className="relation_box">
            연관뉴스
            <div className="relation_news">
                <RoadMap/>
            </div>
        </div>
    )
}

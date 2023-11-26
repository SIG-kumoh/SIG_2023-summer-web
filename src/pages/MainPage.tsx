import BubbleChart from "../components/bubble-chart/BubbleChart";
import React from "react";
import {Categories, Detail} from "../config/config";
import {usePageStore} from "../store";
import RoadMap from "../components/road-map/RoadMap";

export default function MainPage() {
    const {cur} = usePageStore()
    const detail:Detail = Categories[cur]
    return(
        <div className="container">
            <div className="category_name">{detail.name}</div>
            {/*<BubbleChart />*/}
            <RoadMap/>
        </div>
    )
}
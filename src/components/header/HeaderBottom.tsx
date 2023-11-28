import React from "react";
import {Link} from "react-router-dom";
import {Categories, Detail} from "../../config/config";
import {usePageStore} from "../../store";
import WeatherWidget from "../weather/WeatherWidget";

export default function HeaderBottom() {
    const category = Categories
    return(
        <div className="header_bottom">
            <div className="header_bottom_inner">
                <div className="card_container">
                    {category.map((data, index) =>
                        <Card key={index} url={data.url} name={data.name} idx={data.idx} section_id={data.section_id}/>
                    )}
                </div>
                {/*<WeatherWidget/>*/}
            </div>
        </div>
    )
}

function Card(data:Detail) {
    const {cur, setCur} = usePageStore();
    return(
        <Link to={data.url}>
            <div onClick={() => setCur(data.idx)} className={cur === data.idx ? "header_bottom_card select" : "header_bottom_card"}>
                {data.name}
            </div>
        </Link>
    )
}
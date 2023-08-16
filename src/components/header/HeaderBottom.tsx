import "./HeaderBottom.css"
import React from "react";
import {Link} from "react-router-dom";
import {Categories, Detail} from "../../config";
import {usePageStore} from "../../store";

export default function HeaderBottom() {
    const category = Categories
    return(
        <div className="header_bottom">
            <div className="header_bottom_inner">
                {category.map((data, index) =>
                    <Card key={index} url={data.url} name={data.name} idx={data.idx} toServer={data.toServer}/>
                )}
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
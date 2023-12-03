import RoadMap from "../road-map/RoadMap";
import React from "react";
import TopicNode from "../road-map/TopicNode";
import {Node} from "../../config/config";

interface Prop {
    nodes: Array<Node>
}

export default function RelationNews (prop: Prop) {
    const nodes = prop.nodes
    return(
        <div className="relation_box">
            <div className="relation_title">
                연관뉴스
            </div>
            <div className="relation_news">
                {RoadMap(nodes.length)}
                <div className="info_block">
                    {nodes.map((e: any,i:number) =>
                        <TopicNode key={e.clusterId} id={e.clusterId} title={e.title} regdate={e.regdate} topic={e.words} idx={i}/>
                    )}
                </div>
            </div>
        </div>
    )
}

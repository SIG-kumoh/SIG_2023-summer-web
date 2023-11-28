import * as d3 from "d3";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {Topic} from "../../config/config";

const nodes = [
    { id: 94865, regdate: "2023-09-13", imgUrl: "https://imgnews.pstatic.net/image/032/2023/11/27/0003263827_001_20231128093801098.jpg?type=w647", topic: "이준석, 인요한, 부모", x: 30, y: 0, root: true },
    { id: 94866, regdate: "2023-09-01", imgUrl: "https://imgnews.pstatic.net/image/032/2023/11/27/0003263673_001_20231127093301085.jpg?type=w647", topic: "이준석, 국민의힘, 연설", x: 30, y: 250, root: false },
    { id: 94867, regdate: "2023-08-27", imgUrl: "\thttps://imgnews.pstatic.net/image/025/2023/11/27/0003324350_001_20231127101601072.jpg?type=w647", topic: "응애, 이거, 해줘", x: 30, y: 500, root: false },
    // { id: 94868, title: "이종석 헌재소장 인사청문회 13일 열린다", x: 0, y: 0, root: false },
    // { id: 94869, title: "독거노인·장애인 돕는 소상공인에…LG유플러스, 3년째 ‘적층 나눔’ 실천", x: 0, y: 0, root: false },
    // { id: 94870, title: "CJ그룹 창립 70주년…이재현 회장 “온리원 정신 재건” 주문", x: 0, y: 0, root: false },
    // { id: 94871, title: "SK넥실리스 “압도적 기술로 ‘초박형 동박’ 광폭 생산", x: 0, y: 0, root: false },
    // { id: 94872, title: "삼성 일가, 상속세 내려 주식 2조6천억원 매각", x: 0, y: 0, root: false },
    // { id: 94873, title: "LG디스플레이, 초대형 투명 OLED 테이블…스타벅스 인테리어 혁신[포토뉴스]", x: 0, y: 0, root: false },
    // { id: 94874, title: "못 버는 것도 힘겨운데…저소득층, 못 먹는 설움까지", x: 0, y: 0, root: false },
];
const links = [
    { source: 94865, target: 94866 },
    { source: 94866, target: 94867 },
];

export default function RoadMap() {
    interface Node {
        id: number,
        title: string,
        x: number,
        y: number,
        root: boolean
    }

    interface Link {
        source: number,
        target: number
    }

    function makeNodes(curCluster: Topic, relatedClusters: Array<Topic>): [Array<Node>, Array<Link>] {
        const nodes: Array<Node> = []
        const links: Array<Link> = []

        nodes.push({id: curCluster.clusterId, title: curCluster.title, x: 0, y: 0, root: true})
        links.push({source: curCluster.clusterId, target: curCluster.relatedClusterId})

        relatedClusters.forEach((e: Topic) => {
            nodes.push({id: e.clusterId, title: e.title, x: 0, y: 0, root: false})
            links.push({source: e.clusterId, target: e.relatedClusterId})
        })

        return [nodes, links]
    }

    const navigate = useNavigate()
    const svgRef = useRef(null);
    const width = 250;
    const height = 630;
    //const [nodes, links] = makeNodes(curClusters, relatedClusters)

    useEffect(() => {
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)

        const link = svg
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        const node = svg
            .selectAll("g")
            .data(nodes)
            .enter()
            .append("g")
            .each(function (d) {
                d3.select(this)
                    .append("circle")
                    .attr("r", (d: any) => {
                        if (d.root) {
                            return 10
                        } else {
                            return 5
                        }
                    })
                    .attr("fill", "#293241");
                d3.select(this)
                    .append("text")
                    .text((d: any) => {
                        return d.regdate;
                    })
                    .attr("x", 50)
                    .attr("y", 5)
                    //.style("display", "none")
                d3.select(this)
                    .append("image")
                    .attr("xlink:href",(d: any) => {
                        return d.imgUrl;
                    })
                    .attr("x",50)
                    .attr("y",0)
                    .attr("width",150)
                    .attr("height",150);
                d3.select(this)
                    .append("text")
                    .text((d: any) => {
                        return d.topic;
                    })
                    .attr("x", 50)
                    .attr("y", 150)
            })
            .on("mouseover", function(){
                d3.select(this).select("circle").attr("fill", "#EE6C4D")
                //d3.select(this).select("text").style("display", null)
            })
            .on("mouseout", function() {
                d3.select(this).select("circle").attr("fill", "#293241")
                //d3.select(this).select("text").style("display", "none")
            })
            .on("click", (d) => {
                navigate(`/topic-page/${d.id}`)
            });

        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).distance(() => 200).id((d: any) => d.id)
            )
            //.force("charge", d3.forceManyBody().strength(-200))
            //.force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", () => {
                link.attr("x1", (d: any) => d.source.x)
                    .attr("y1", (d: any) => d.source.y)
                    .attr("x2", (d: any) => d.target.x)
                    .attr("y2", (d: any) => d.target.y);
                node.attr("transform", (d: any) => `translate(${d.x}, ${d.y})`);
            });
    }, [nodes, links])

    return <svg ref={svgRef} />;
}
import * as d3 from "d3";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {Topic} from "../../config/config";

const dummyNodes = [
    { id: 94865, title: "바느질 나눔 봉사’ 김도순·곽경희씨 LG의인상", x: 0, y: 0, root: true },
    { id: 94866, title: "기적의 생환’ 봉화 광부 “다시, 첫 생일", x: 0, y: 0, root: false },
    { id: 94867, title: "등산로 순찰’ 인생 2막 연 퇴직 경찰", x: 0, y: 0, root: false },
    { id: 94868, title: "이종석 헌재소장 인사청문회 13일 열린다", x: 0, y: 0, root: false },
    { id: 94869, title: "독거노인·장애인 돕는 소상공인에…LG유플러스, 3년째 ‘적층 나눔’ 실천", x: 0, y: 0, root: false },
    { id: 94870, title: "CJ그룹 창립 70주년…이재현 회장 “온리원 정신 재건” 주문", x: 0, y: 0, root: false },
    { id: 94871, title: "SK넥실리스 “압도적 기술로 ‘초박형 동박’ 광폭 생산", x: 0, y: 0, root: false },
    { id: 94872, title: "삼성 일가, 상속세 내려 주식 2조6천억원 매각", x: 0, y: 0, root: false },
    { id: 94873, title: "LG디스플레이, 초대형 투명 OLED 테이블…스타벅스 인테리어 혁신[포토뉴스]", x: 0, y: 0, root: false },
    { id: 94874, title: "못 버는 것도 힘겨운데…저소득층, 못 먹는 설움까지", x: 0, y: 0, root: false },
];
const dummyLinks = [
    { source: 94865, target: 94866 },
    { source: 94865, target: 94867 },
    { source: 94865, target: 94868 },
    { source: 94866, target: 94869 },
    { source: 94866, target: 94870 },
    { source: 94866, target: 94871 },
    { source: 94867, target: 94872 },
    { source: 94867, target: 94873 },
    { source: 94868, target: 94874 },
];

export default function RoadMap(curClusters: Topic, relatedClusters: Array<Topic>, width: number = 1000, height: number =500) {
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

    function makeNodes(curClusters: Topic, relatedClusters: Array<Topic>): [Array<Node>, Array<Link>] {
        const nodes: Array<Node> = []
        const links: Array<Link> = []

        nodes.push({id: curClusters.clusterId, title: curClusters.title, x: 0, y: 0, root: true})
        links.push({source: curClusters.clusterId, target: curClusters.relatedClusterId})

        relatedClusters.forEach((e: Topic) => {
            nodes.push({id: e.clusterId, title: e.title, x: 0, y: 0, root: false})
            links.push({source: e.clusterId, target: e.relatedClusterId})
        })

        return [nodes, links]
    }

    const navigate = useNavigate()
    const svgRef = useRef(null);
    const [nodes, links] = makeNodes(curClusters, relatedClusters)

    useEffect(() => {
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("position", "relative")

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
                        return d.title;
                    })
                    .attr("x", -(d.title.length * 6))
                    .attr("y", 35)
                    .style("display", "none")
            })
            .on("mouseover", function(){
                d3.select(this).select("circle").attr("fill", "#EE6C4D")
                d3.select(this).select("text").style("display", null)
            })
            .on("mouseout", function() {
                d3.select(this).select("circle").attr("fill", "#293241")
                d3.select(this).select("text").style("display", "none")
            })
            .on("click", (d) => {
                navigate(`/topic-page/${d.id}`)
            });

        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).distance(() => 30).id((d: any) => d.id)
            )
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(width / 2, height / 2))
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
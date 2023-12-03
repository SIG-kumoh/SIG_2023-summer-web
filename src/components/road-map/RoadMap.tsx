import * as d3 from "d3";
import {useEffect, useRef} from "react";
import {Topic} from "../../config/config";
import {text} from "d3";

interface Node {
    id: number,
    x: number,
    y: number,
    color: string
}

interface Link {
    source: number,
    target: number
}

function setColor(idx: number): string {
    if (idx === 0) {
        return "#EE6C4D"
    } else {
        return "#293241"
    }
}

export default function RoadMap(dataLength: number) {
    const svgRef = useRef(null);
    const width = 50;
    const height = 165 * dataLength;
    const nodeX = 15;

    function makeNodes(length: number): [Array<Node>, Array<Link>] {
        const nodes: Array<Node> = []
        const links: Array<Link> = []

        for (let i = 0; i < length; i++) {
            nodes.push({id: i, x: nodeX, y: 75 + i * 165, color: setColor(i)});
            if (i + 1 < length) {
                links.push({source: i, target: i + 1})
            }
        }

        return [nodes, links]
    }

    const [nodes, links] = makeNodes(dataLength)

    useEffect(() => {
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("id", "graph")

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
                        return 10
                    })
                    .attr("fill", d.color)
                    .text("v")
            });

        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).distance(() => 165).id((d: any) => d.id)
            )
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
import * as d3 from 'd3';
import {useEffect, useRef} from "react";
import {BaseURL, GetTodayDate} from "../../config/config";

//https://gist.github.com/officeofjane/a70f4b44013d06b9c0a973f163d8ab7a
//https://codepen.io/Jackfiallos/pen/jLWrjb
//https://sypear.tistory.com/85

interface sample {
    source:string, val:number, color:string
}
interface sample2 {
    source:string, val:number, color:string, radius:number, size:number, x:number, y:number
}

const samples:Array<sample> = [
    {source: "Item 1", val: 130, color: "#C9D6DF"},
    {source: "Item 2", val: 250, color: "#F7EECF"},
    {source: "Item 3", val: 570, color: "#E3E1B2"},
    {source: "Item 4", val: 300, color: "#F9CAC8"},
    {source: "Item 5", val: 470, color: "#D1C2E0"},
    {source: "Item 6", val: 130, color: "#C9D6DF"},
    {source: "Item 7", val: 250, color: "#F7EECF"},
    {source: "Item 8", val: 570, color: "#E3E1B2"},
    {source: "Item 9", val: 300, color: "#F9CAC8"},
    {source: "Item 10", val: 470, color: "#D1C2E0"}
];

export default function BubbleChart() {
    const reqURL = BaseURL + "/news/hottopic?date=" + GetTodayDate

    const width = 900
    const height = 400
    const center = { x: width / 2, y: height / 2 }
    const strength = 0.05
    const svgRef = useRef(null)
    useEffect(() => {
        function charge(d: any) {
            return Math.pow(d.radius, 2.0) * strength
        }

        function createNodes(data:Array<sample>) {
            const maxAmount:number = d3.max(data, (d: any) => +d.val) as number

            const radiusScale = d3.scaleSqrt()
                .domain([0, maxAmount])
                .range([0, 80]);

            const myNodes:Array<sample2> = data.map(d => ({
                ...d,
                radius: radiusScale(+d.val),
                size: +d.val,
                x: Math.random() * width,
                y: Math.random() * height,
            }))
            return myNodes
        }

        const simulation = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(charge))
            .force('x', d3.forceX().strength(strength).x(center.x))
            .force('y', d3.forceY().strength(strength).y(center.y))
            .force('collision', d3.forceCollide().radius((d: any) => d.radius + 1))
        simulation.stop()

        const svg = d3.select('svg')
            .attr("width", width)
            .attr("height", height);

        const nodes = createNodes(samples)

        const elements = svg.selectAll('.bubble')
            .data(nodes, (d: any) => {
                return d.source
            }).enter().append('g')

        const bubbles = elements
            .append('circle')
            .classed('bubble', true)
            .attr('r', (d: any) => d.radius)
            .attr('fill', (d: any) => d.color)
            .on("mouseover", function(d) {
                d3.select(this).style("cursor", "pointer");
            })
            .on('click', (event, d) => {
                console.log(event.source)
            })

        const label = elements
            .append('text')
            .attr('dy', '-1em')
            .style('text-anchor', 'middle')
            .style('font-size', '10px')
            .text((d: any) => d.source)

        function ticked() {
            elements.attr('transform', (d: any) =>
                `translate(${d.x},${d.y})`);
        }
        simulation.nodes(nodes).on('tick', ticked).restart()
    }, [samples])

    return(
        <svg ref={svgRef}></svg>
    )
}

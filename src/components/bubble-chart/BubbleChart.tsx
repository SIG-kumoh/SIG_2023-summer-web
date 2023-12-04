import * as d3 from 'd3';
import {useEffect, useRef} from "react";
import {BaseURL, GetServerData, GetTodayDate, News, Topic} from "../../config/config";
import {useQuery} from "react-query";
import {useNavigate} from "react-router-dom";

//https://gist.github.com/officeofjane/a70f4b44013d06b9c0a973f163d8ab7a
//https://codepen.io/Jackfiallos/pen/jLWrjb
//https://sypear.tistory.com/85

interface expendTopic {
    title:string, summary:string, imgUrl:string, clusterId:number, chatNamespace:string, relatedClusterId:number, articleList:Array<News>,
    radius:number, size:number, x:number, y:number, color:string, fontSize:number
}

function setColor(idx: number):string {
    if (idx === 0) {
        return "#C9D6DF"
    } else if (idx === 1) {
        return "#F7EECF"
    } else if (idx === 2) {
        return "#E3E1B2"
    } else if (idx === 3) {
        return "#F9CAC8"
    } else {
        return "#ffffff"
    }
}


const width = 900
const height = 600

function makeTextArray(text:string, size: number) {
    const textLength = size * 0.6
    if (text.length > textLength * 3) {
        text = text.substring(0, textLength * 3 - 3) + "..."
    }
    const result:Array<string> = []
    for(let i = 0; i < text.length; i+=textLength) {
        result.push(text.substring(i, i + textLength))
    }
    return result
}

export default function BubbleChart() {
    const navigate = useNavigate()
    const reqURL = BaseURL + "/news/hottopic?date=" + GetTodayDate()
    const {data, isLoading, isError} = useQuery(['hottopic'], () => GetServerData(reqURL))
    const center = { x: width / 2, y: height / 2 }
    const strength = 0.05
    const svgRef = useRef(null)

    useEffect(() => {
        if (isLoading || isError || data.length == 0) {
            return
        }
        data.sort((a: Topic, b: Topic) => {
            return b.size - a.size
        })
        function charge(d: any) {
            return Math.pow(d.radius, 2.0) * strength
        }

        function createNodes(data:Array<Topic>) {
            const maxAmount:number = d3.max(data, (d: any) => +d.size) as number

            const radiusScale = d3.scaleSqrt()
                .domain([0, maxAmount])
                .range([40, 90]);

            const myNodes:Array<expendTopic> = data.map((d, idx) => ({
                ...d,
                radius: radiusScale(+Math.pow(d.size,((data.length - idx) * 0.15))),
                size: +d.size,
                x: Math.random() * width,
                y: Math.random() * height,
                color: setColor(idx),
                fontSize: 14
            }))
            return myNodes
        }

        const simulation = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(charge))
            .force('x', d3.forceX().strength(strength).x(center.x))
            .force('y', d3.forceY().strength(strength).y(center.y))
            .force('collision', d3.forceCollide().radius((d: any) => d.radius + 5))

        const svg = d3.select('svg')
            .attr("width", width)
            .attr("height", height);

        const nodes = createNodes(data)

        const elements = svg.selectAll('.bubble')
            .data(nodes, (d: any) => {
                return d.title
            })
            .enter()
            .append('g')
            .on("mouseover", function(d) {
                d3.select(this).style("cursor", "pointer");
                d3.select(this).select("circle").attr('r', (d: any) => d.radius * 1.05)
            })
            .on("mouseout", function(d) {
                d3.select(this).select("circle").attr('r', (d: any) => d.radius)
            })
            .on('click', (event, d) => {
                //window.location.href = "/topic-page/" + event.clusterId
                navigate("/topic-page/" + event.clusterId + "?room_name=" + event.roomName)
            })

        const bubbles = elements
            .append('circle')
            .classed('bubble', true)
            .attr('r', (d: any) => d.radius)
            .attr('fill', (d: any) => d.color)


        const label = elements
            .append('text')
            .style('text-anchor', 'middle')
            .style('white-space', 'pre')
            .style("font-weight", "bold")
            .text((d: any) => d.title)


        svg.selectAll('text').call(function(t){
            t.each(function(d:any){
                const self = d3.select(this);
                const s = makeTextArray(d.title, d.size);
                self.text('');
                s.map((d,i) => {
                    self.append("tspan")
                        .attr("x", 0)
                        .attr("dy", i ? "1.2em" : "-.2em")
                        .text(d);
                })
            })
        })

        function ticked() {
            elements.attr('transform', (d: any) =>
                `translate(${d.x},${d.y})`);
        }
        simulation.nodes(nodes).on('tick', ticked).restart()
    }, [data])

    return(
        <svg ref={svgRef}></svg>
    )
}

import * as d3 from 'd3';
import {useEffect, useRef} from "react";
import {BaseURL, GetServerData, GetTodayDate, News, Topic} from "../../config/config";
import {useQuery} from "react-query";

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
const height = 550

function makeTextArray(text:string) {
    const textLength = 7
    if (text.length > textLength * 3) {
        text = text.substr(0, textLength * 3 - 3) + "..."
    }
    const result:Array<string> = []
    for(let i = 0; i < text.length; i+=textLength) {
        result.push(text.substr(i, textLength))
    }
    return result
}

export default function BubbleChart() {
    const reqURL = BaseURL + "/news/hottopic?date=" + GetTodayDate()
    const {data, isLoading, isError} = useQuery(['hottopic'], () => GetServerData(reqURL))
    const center = { x: width / 2, y: height / 2 }
    const strength = 0.05
    const svgRef = useRef(null)
    useEffect(() => {
        if (isLoading || isError) {
            return
        }
        data.sort((a: Topic, b: Topic) => {
            return b.articleList.length - a.articleList.length
        })
        function charge(d: any) {
            return Math.pow(d.radius, 2.0) * strength
        }

        function createNodes(data:Array<Topic>) {
            const maxAmount:number = d3.max(data, (d: any) => +d.articleList.length) as number

            const radiusScale = d3.scaleSqrt()
                .domain([0, maxAmount])
                .range([0, 80]);

            const myNodes:Array<expendTopic> = data.map((d, idx) => ({
                ...d,
                radius: radiusScale(+Math.pow(d.articleList.length,1.07)),
                size: +d.articleList.length,
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
            .force('collision', d3.forceCollide().radius((d: any) => d.radius + 1))
        simulation.stop()

        const svg = d3.select('svg')
            .attr("width", width)
            .attr("height", height);

        const nodes = createNodes(data)

        const elements = svg.selectAll('.bubble')
            .data(nodes, (d: any) => {
                return d.title
            }).enter().append('g').on("mouseover", function(d) {
                d3.select(this).style("cursor", "pointer");
            })
            .on('click', (event, d) => {
                window.location.href = "/topic-page/" + event.clusterId
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
            .text((d: any) => d.title)


        svg.selectAll('text').call(function(t){
            t.each(function(d:any){
                var self = d3.select(this);
                var s = makeTextArray(d.title);
                self.text('');
                s.map((d,i) => {
                    self.append("tspan")
                        .attr("x", 0)
                        .attr("dy", i ? "1.2em" : "-.2em")
                        .text(s[i]);
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

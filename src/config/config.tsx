export interface Detail {
    url:string, name:string, idx:number, section_id:string
}
export const Categories:Array<Detail> = [{url: "/", name: "홈", idx:0, section_id: "/hot"},
    {url: "/politics", name: "정치", idx:1, section_id: "1"},
    {url: "/economy", name: "경제", idx:2, section_id: "2"},
    {url: "/society", name: "사회", idx:3, section_id: "3"},
    {url: "/life", name: "생활", idx:4, section_id: "4"},
    {url: "/IT", name: "IT", idx:5, section_id: "5"},
    {url: "/world", name: "세계", idx:6, section_id: "6"}]

export interface Topic {
    title:string, summary:string, imgUrl:string, clusterId:number, chatNamespace:string, relatedClusterId:number, articleList:Array<News>
}

export const BaseURL = "http://202.31.202.34:80/api"

export async function GetServerData(url:string) {
    const topicData = await fetch(url)
    return topicData.json()
}

export interface News {
    title:string, url:string, imgUrl:string, press:string, regdate:string, content:string
}

export function GetTodayDate() {
    let today = new Date()
    //return today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
    return "2023-10-24"
}

export interface User {
    id:string, pw:string, imgUrl:string, nickname:string
}

export interface Weather {
    fcstTime: string,
    temperature: number,
    rainPercent: number,
    weatherStatus: string
}

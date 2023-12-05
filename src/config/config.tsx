export interface Detail {
    url:string, name:string, idx:number, section_id:string
}
export const Categories:Array<Detail> = [{url: "/", name: "홈", idx:0, section_id: ""},
    {url: "/politics", name: "정치", idx:1, section_id: "1"},
    {url: "/economy", name: "경제", idx:2, section_id: "2"},
    {url: "/society", name: "사회", idx:3, section_id: "3"},
    {url: "/life", name: "생활", idx:4, section_id: "4"},
    {url: "/IT", name: "IT", idx:5, section_id: "5"},
    {url: "/world", name: "세계", idx:6, section_id: "6"}]

export interface Topic {
    title:string, summary:string, imgUrl:string, clusterId:number, chatNamespace:string, relatedClusterId:number, articleList:Array<News>, size:number, words:Array<string>
}
export const ServerURL = "http://202.31.202.34:80/"
export const BaseURL = ServerURL + "api"
export const ChatURL = ServerURL + "socket.io/conn"

export async function GetServerData(url:string) {
    const topicData = await fetch(url)
    return topicData.json()
}

export async function GetServerDataWithAuthorization(url:string, authorization:string) {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authorization}`
        }
    }).then(res => res.json())
}
export interface News {
    title:string, url:string, imgUrl:string, press:string, regdate:string, content:string, articleId:number
}

export function GetTodayDate() {
    let today = new Date()
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    //return "2023-12-05"
    return year + "-" + month + "-" + day
}

export function GetTodayDateAndTime(cur:string):string {
    return cur.substring(0, 10) + " " + cur.substring(11, 16)
}

export interface Message {
    id:number, username:string, message:string, regdate:string, activated:number
}

export interface Weather {
    fcstTime: string,
    temperature: number,
    rainPercent: number,
    weatherStatus: string,
    rainStatus: string
}

export interface Node {
    id: number, title: string, regdate:string, topic: Array<string>, idx:number
}

export function Loading() {
        return(
            <div className="wrapper">
                <div className="box-wrap">
                    <div className="box one"></div>
                    <div className="box two"></div>
                    <div className="box three"></div>
                    <div className="box four"></div>
                    <div className="box five"></div>
                    <div className="box six"></div>
                </div>
            </div>
        )

}

import { Link } from "react-router-dom";
import {News} from "../../config/config";

const dummyNews:Array<News> = [
    {date:"아이뉴스24 2023.11.02",title:"[오늘날씨] 낮 최고 '28도' 초여름 날씨…중부지방은 구름 많아", url:"", text:"목요일인 2일 오전 남부내륙 중심으로 짙은 안개가 끼는 곳이 있겠고, 중부지방 하늘은 가끔...",img_url:"https://imgnews.pstatic.net/image/origin/031/2023/11/02/784334.jpg?type=nf106_72"},
    {date:"뉴시스 2023.11.02",title:"낮 기온 22~28도…경기북부·강원영서 미세먼지 '나쁨'",url:"",text:"목요일인 2일은 일본 규슈 부근에 위치한 고기압 영향권에 들며 기온이 평년보다 높은 가운...",img_url:"https://imgnews.pstatic.net/image/origin/003/2023/11/02/12183590.jpg?type=nf106_72"},
    {date:"데일리안 2023.11.02",title:"김장철 앞두고 낮 최고 27도…11월인데 초 여름 날씨",url:"",text:"목요일인 오는 2일은 중부지방에 가끔 구름 많지만 대부분 지역이 맑겠다. 서울 등 수도...", img_url:"https://imgnews.pstatic.net/image/origin/119/2023/11/02/2764815.jpg?type=nf106_72"},
    {date:"강원도민일보 2023.11.02",title:"오늘 '역대 11월 최고기온' 기록…목요일도 예년보다 포근",url:"",text:"예년보다 포근한 날씨가 이어지는 가운데 목요일인 2일 아침 충북남부와 남부내륙을 중심...",img_url:"https://imgnews.pstatic.net/image/origin/654/2023/11/01/56423.jpg?type=nf106_72"},
    {date:"뉴시스 2023.11.02",title:"대체로 맑은 날씨…오전 서울 미세먼지 '나쁨'[내일날씨]",url:"",text:"목요일인 오는 2일은 중부지방에 가끔 구름 많지만 대부분 지역이 맑겠다. 서울 등 수도...",img_url:"https://imgnews.pstatic.net/image/origin/003/2023/11/01/12183152.jpg?type=nf106_72"}
]

export default function TopicNews() {
    return(
        <div className="news_container">
            <ul>
                {dummyNews.map((i:News) => (
                    <li className="news" key={i.url}>
                        <Link to={i.url} target="_blank">
                            <NewsCard title={i.title} url={i.url} text={i.text} img_url={i.img_url} date={i.date}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function NewsCard(data:News) {
    return(
        <div className="news_card">
            <img src={data.img_url}/>
            <div className="news_text_box">
                <div className="news_title">{data.title}</div>
                <div className="news_text">{data.text}</div>
                <div className="news_date">{data.date}</div>
            </div>
        </div>
    )
}
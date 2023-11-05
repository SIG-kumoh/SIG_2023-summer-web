import {News} from "../../config/config";

const exampleNews:News = {
    title:"“11월인데 왜이리 더워”…서울 115년 만의 날씨 역주행",
    text:"",
    img_url:"https://imgnews.pstatic.net/image/009/2023/11/02/0005208614_001_20231102102705944.jpeg?type=w647",
    date:"매일경제 2023.11.02",
    url:""
}

export default function RelationNews () {
    return(
        <div className="relation_box">
            연관뉴스
            <div className="relation_news">
                <img className="relation_img" src={exampleNews.img_url}/>
                <div>{exampleNews.title}</div>
            </div>
        </div>
    )
}

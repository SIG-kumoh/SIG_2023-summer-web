import {News} from "../../config/config";

const exampleNews:News = {
    title:"공사중",
    imgUrl:"/img/오늘의 뉴스.png",
    regdate:"",
    url:"",
    press:"",
    content:""
}

export default function RelationNews () {
    return(
        <div className="relation_box">
            연관뉴스
            <div className="relation_news">
                <img className="relation_img" src={exampleNews.imgUrl}/>
                <div>{exampleNews.title}</div>
            </div>
        </div>
    )
}

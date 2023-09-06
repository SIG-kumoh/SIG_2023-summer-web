import "./HeaderTop.css"
import {Link} from "react-router-dom";
import {usePageStore} from "../../store";

export default function HeaderTop() {
    const {setCur} = usePageStore();
    return (
        <div className="header_top">
            <div className="top_inner">
                <Link to={"/"} onClick={() => setCur(0)}>
                    <div className="top_inner_left">오늘의 뉴스</div>
                </Link>
                <div className="top_inner_right">로그인</div>
            </div>
        </div>
    )
}
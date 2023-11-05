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
                <div className="top_right">
                    <Link to={"/sign-up"}>
                        <div className="top_sign_up">회원가입</div>
                    </Link>
                    <Link to={"/login"}>
                        <div className="top_login">로 그 인</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
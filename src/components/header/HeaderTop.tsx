import {Link} from "react-router-dom";
import {usePageStore} from "../../store";

export default function HeaderTop() {
    const {setCur} = usePageStore();
    const {isLoggedIn, nickname} = usePageStore()
    let today:Date = new Date()
    return (
        <div className="header_top">
            <div className="top_inner">
                <div className="top_inner_left">
                    <Link to={"/"} onClick={() => setCur(0)}>
                        <div className="main_title">오늘의 뉴스</div>
                    </Link>
                    <div className="main_date">
                        {today.getMonth() + 1}월 {today.getDate()}월
                    </div>
                </div>
                {MakeRight(isLoggedIn, nickname)}
            </div>
        </div>
    )
}

function MakeRight(bool:boolean, nickname:string) {
    if (bool) {
        return(
        <div className="top_right">
            <div className="top_sign_up">로그아웃</div>
            <div className="top_login">{nickname} 님</div>
        </div>
        )
    } else {
        return(
            <div className="top_right">
                <Link to={"/user/sign-up"}>
                    <div className="top_sign_up">회원가입</div>
                </Link>
                <Link to={"/login"}>
                    <div className="top_login">로 그 인</div>
                </Link>
            </div>
        )
    }

}
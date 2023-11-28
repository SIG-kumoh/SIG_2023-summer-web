import {Link, useNavigate} from "react-router-dom";
import {loginStore, usePageStore} from "../../store";
import {PostLogout} from "../../config/post_method";

export default function HeaderTop() {
    const {setCur} = usePageStore();
    const {isLoggedIn, authorization, setIsLoggedIn, username, setAuthorization, setAuthority, authority} = loginStore()

    let today:Date = new Date()
    const week:Array<string> = ['일', '월', '화', '수', '목', '금', '토']
    //console.log(username, isLoggedIn, authorization, setIsLoggedIn, setAuthorization, setAuthority, authority)

    const logout = () => {
        PostLogout(authorization)
        setIsLoggedIn(false)
        setAuthority([])
        setAuthorization("")
        window.location.reload()
    }
    return (
        <div className="header_top">
            <div className="top_inner">
                <div className="top_inner_left">
                    <Link to={"/"} onClick={() => setCur(0)}>
                        <div className="top_inner_container">
                            <div className="main_title">오늘의 뉴스</div>
                            <img className="logo" src={"/img/오늘의 뉴스.png"}/>
                        </div>
                    </Link>
                    <div className="main_date">
                        {today.getMonth() + 1}월 {today.getDate()}월 {week[today.getDay()]}요일
                    </div>
                </div>
                {MakeRight(isLoggedIn, username, logout)}
            </div>
        </div>
    )
}

function MakeRight(bool:boolean, username:string, logout:any) {
    if (bool) {
        return(
        <div className="top_right">
            <div className="top_sign_up" onClick={event => logout(event)}>로그아웃</div>
            <div className="top_login">{username} 님</div>
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
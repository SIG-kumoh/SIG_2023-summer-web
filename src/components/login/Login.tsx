import {BiUser} from "react-icons/bi";
import {AiFillLock} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {loginStore, usePageStore,} from "../../store";
import React, {useState} from "react";
import {BaseURL, GetServerDataWithAuthorization} from "../../config/config";

export default function Login() {
    const {setCur} = usePageStore();
    const {setIsLoggedIn, setAuthorization, setAuthority, setUsername} = loginStore()
    const navigate = useNavigate()
    const [id, setId] = useState<string>("")
    const [pw, setPw] = useState<string>("")

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(BaseURL + "/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username':id, 'password': pw})
        }).then(res => {
            setAuthorization(res.headers.get('Authorization'))
            if(res.status === 401) {
                alert("아이디 또는 비밀번호가 일치하지 않습니다.")
                return false
            }
            return res.json()
        }).then(res => {
            if(res === false) {
                window.location.reload()
                return
            }
            setAuthority(res.authorities)
            setUsername(res.username)
            setIsLoggedIn(true)
            setCur(0)
            navigate("/")
            //window.location.reload()
        })
    }
    return(
        <div className="login_box">
            <div className="login_inner">
                <Link to={"/"} onClick={() => setCur(0)}>
                    <div className="login_title">오늘의 뉴스</div>
                </Link>
                <form onSubmit={onSubmit}>
                    <div className="login_input_container">
                        <div className="login_input_box">
                            <BiUser className="login_icon"/>
                            <input placeholder={" 아이디"} className="login_input id" onChange={(e) => setId(e.currentTarget.value)}/>
                        </div>
                        <div className="hor_line"></div>
                        <div className="login_input_box">
                            <AiFillLock className="login_icon" />
                            <input type='password' placeholder={" 비밀번호"} className="login_input pw" onChange={(e) => setPw(e.currentTarget.value)}/>
                        </div>
                    </div>
                    <button className="login_button">
                        로그인
                    </button>
                </form>
                <Link to={"/user/sign-up"}>
                    <div className="sign_up_button">
                        회원가입
                    </div>
                </Link>
            </div>
        </div>
    )
}

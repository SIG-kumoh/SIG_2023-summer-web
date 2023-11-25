import {BiUser} from "react-icons/bi";
import {AiFillLock} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {loginStore, usePageStore,} from "../../store";
import React, {useState} from "react";
import {useMutation} from "react-query";
import {BaseURL} from "../../config/config";

interface LoginProps {
    BaseURL: boolean
}

async function login(id: string, pw: string) {
    await fetch(BaseURL + "/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'username':id, 'password': pw})
    })
}

export default function Login() {
    const {setCur} = usePageStore();
    const {isLoggedIn, setIsLoggedIn} = loginStore()
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
        }).then(res => res.ok).then(res => navigate("/"))
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
                    <button className="login_button" formAction=''>
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

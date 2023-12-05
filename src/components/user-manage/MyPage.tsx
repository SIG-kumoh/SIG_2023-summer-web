import Id from "./Id";
import Pw from "./Pw";
import {useState} from "react";
import {BaseURL} from "../../config/config";
import {usePageStore} from "../../store";
import {useNavigate} from "react-router-dom";
import {PostLogout} from "../../config/post_method";

export default function MyPage() {
    const [pw, setPw] = useState<string>('')
    const {username, authorization, setIsLoggedIn, setAuthorization, setAuthority} = usePageStore()
    const navigate = useNavigate()
    const changePw = (e:React.MouseEvent) => {
        e.preventDefault()
        fetch(BaseURL + "/user/" + username, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authorization}`
            },
            body: JSON.stringify({'username':username, 'password': pw})
        }).then(res => {
            if(res.status === 401) {
                alert("비밀번호 변경에 실패했습니다.")
                window.location.reload()
            } else {
                alert("비밀번호 변경에 성공했습니다.")
                window.location.reload()
            }
        })
    }

    const deleteUser = (e:React.MouseEvent) => {
        e.preventDefault()
        fetch(BaseURL + "/user/" + username, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${authorization}`
            },
        }).then(res => {
            if(res.status === 401) {
                alert("회원 탈퇴에 실패했습니다.")
            } else {
                alert("회원 탈퇴에 성공했습니다.")
                PostLogout(authorization)
                setIsLoggedIn(false)
                setAuthority([])
                setAuthorization("")
                navigate("/")
                window.location.reload()
                navigate("/")
            }
        })
    }

    return(
        <div>
            <Id setId={()=>{}} id={""}></Id>
            <Pw setPw={setPw} pw={pw}></Pw>
            <button className="user_button" onClick={e=>changePw(e)}>비밀번호 변경</button>
            <button className="user_button red_color" onClick={e=>deleteUser(e)}>회원 탈퇴</button>
        </div>
    )
}
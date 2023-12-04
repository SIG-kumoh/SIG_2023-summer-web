import Id from "./Id";
import Pw from "./Pw";
import {useState} from "react";
import {BaseURL} from "../../config/config";
import {useNavigate} from "react-router-dom";


export default function SignUp() {
    const navigate = useNavigate()
    const [id, setId] = useState<string>('')
    const [pw, setPw] = useState<string>('')
    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(BaseURL + "/user/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username':id, 'password': pw})
            }).then(res => {
                setId('')
                setPw('')
                if(res.status === 401) {
                    alert("회원가입에 실패했습니다.")
                } else {
                    alert("회원가입에 성공했습니다.")
                    navigate("/")
                }
            })
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <Id setId={setId} id={id}/>
                <Pw setPw={setPw} pw={pw}/>
                <button className="user_button">
                    회원가입
                </button>
            </form>
        </div>
    )
}
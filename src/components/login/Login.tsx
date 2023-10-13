import {BiUser} from "react-icons/bi";
import {AiFillLock} from "react-icons/ai";

export default function Login() {
    return(
        <div className="login_box">
            <div className="login_inner">
                <div className="login_title">오늘의 뉴스</div>
                <div className="login_input_container">
                    <div className="login_input">
                        <div className="">
                            <BiUser className="login_icon"/>
                            <input className="login_input id"/>
                        </div>
                    </div>
                    <div className="hor_line"></div>
                    <div className="login_input">
                        <div className="">
                            <AiFillLock className="login_icon" />
                            <input className="login_input pw"/>
                        </div>
                    </div>
                </div>
                <div className="login_button">
                    로그인
                </div>
                <div className="sign_up_button">
                    회원가입
                </div>
            </div>
        </div>
    )
}
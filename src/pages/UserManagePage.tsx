import SignUp from "../components/user-manage/SignUp";
import {useParams} from "react-router-dom";
import MyPage from "../components/user-manage/MyPage";

export default function UserManagePage() {
    const location = useParams()
    let title = ''
    let isSignUp:boolean = true

    if (location.state === 'sign-up') {
        title = '회원 가입'
    } else if (location.state === 'my-page') {
        title = '마이 페이지'
        isSignUp = false
    }

    return(
        <div className="container">
            <div className="category_name">
                {title}
            </div>
            {isSignUp ? <SignUp/> : <MyPage/>}
        </div>
    )
}
import SignUp from "../components/user-manage/SignUp";
import {useParams} from "react-router-dom";
import MyPage from "../components/user-manage/MyPage";
import {usePageStore} from "../store";

export default function UserManagePage() {
    const location = useParams()
    let title = ''
    const {isLoggedIn} = usePageStore()

    if (location.state === 'sign-up') {
        title = '회원 가입'
    } else if (location.state === 'my-page') {
        title = '마이 페이지'
    }

    return(
        <div className="container">
            <div className="category_name">
                {title}
            </div>
            <div className="user_manage_container">
                {!isLoggedIn ? <SignUp/> : <MyPage/>}
            </div>
        </div>
    )
}
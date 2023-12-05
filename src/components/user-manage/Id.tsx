import {usePageStore} from "../../store";
import {BaseURL} from "../../config/config";
import {useState} from "react";

export default function Id({setId, id}:{setId:Function, id:string}) {
    const {username, isLoggedIn} = usePageStore()
    const [isDuple, setIsDuple] = useState<boolean>(false)

    const makeIdBox = () => {
        if(isLoggedIn) {
            return(
                <div>
                    {username}
                </div>
            )
        } else {
            return(
                <div>
                    <input
                        onChange={(e) => {setId(e.target.value)}}
                        value={id}
                        onBlur={(e) => {dupleCheck(e)}}
                        className='user_manage_input'>
                    </input>
                </div>
            )
        }
    }

    const dupleCheck = (e:React.FocusEvent) => {
        e.preventDefault()
        fetch(BaseURL + "/user/dup-check", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': id})
        }).then(res => {
            if(res.status === 401) {
                return null
            }
            return res.json()
        }).then(res => {
            if(res) {
                setIsDuple(res)
            } else {
                setIsDuple(false)
            }
        })
    }

    return(
        <div className="id_container">
            <div className="id_head">
                <div className='id_title'>아이디</div>
                <div className={isDuple ? 'id_text' : 'id_text hide'}>이미 존재하는 아이디 입니다!</div>
            </div>
            {makeIdBox()}
        </div>
    )
}
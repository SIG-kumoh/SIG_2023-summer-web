import {BaseURL, ChatURL, Message, ServerURL} from "../../config/config";
import React, {useEffect, useRef} from "react";
import {loginStore} from "../../store";

interface MessagesProp {
    messages:Array<Message>
    room_name:string
}

export default function Messages(prop:MessagesProp) {
    const {authority, authorization} = loginStore()
    let messages:Array<Message> = prop.messages
    let room_name:string = prop.room_name
    const scrollRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current?.scrollHeight
        }
    }, [messages]);

    const alertConfirm = (e: React.MouseEvent, m:Message) => {
        e.preventDefault()
        if(window.confirm("채팅 \"" + m.message + "\"을/를 정말 삭제하시겠습니까?")) {
            deleteTopic(m)
        } else {
        }
    }
    const deleteTopic = (m:Message) => {
        fetch(ServerURL + "chat/room/" + room_name + "/" + m.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": authorization
            }
        }).then(res => {
            if (res.status === 200) {
                alert("삭제되었습니다.")
            } else {
                alert("삭제에 실패했습니다.")
            }
        }).catch(err => {
            alert("삭제에 실패했습니다.")
        })
    }

    return(
        <div className='messages_container' ref={scrollRef}>
            {messages.map((m) => {
                return (
                    <div className="message_container" key={m.id}>
                        <div className="msg_username">{m.username}</div>
                        {m.activated === 1 ? <div className="msg_text">{m.message}</div> : <div className="msg_text block">[차단된 채팅입니다]</div>}
                        {authority === 'admin' ? <button onClick={e => alertConfirm(e, m)} className="admin_delete_button">🗑️</button> : <></>}
                    </div>
                )
            })}
        </div>
    )
}
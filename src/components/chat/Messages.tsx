import {Message} from "../../config/config";
import {useEffect, useRef} from "react";

interface MessagesProp {
    messages:Array<Message>
}

export default function Messages(prop:MessagesProp) {
    let messages:Array<Message> = prop.messages
    const scrollRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current?.scrollHeight
        }
    }, [messages]);

    return(
        <div className='messages_container' ref={scrollRef}>
            {messages.map((m) => {
                return (
                    <div className="message_container" key={m.id}>
                        <div className="msg_username">{m.username}</div>
                        <div className="msg_text">{m.message}</div>
                    </div>
                )
            })}
        </div>
    )
}
import {Message} from "../../config/config";

interface MessagesProp {
    messages:Array<Message>
}

export default function Messages(prop:MessagesProp) {
    let messages:Array<Message> = prop.messages
    return(
        <div className='messages_container'>
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
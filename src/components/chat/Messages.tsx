import {Message} from "../../config/config";

interface MessagesProp {
    messages:Array<Message>
}

export default function Messages(prop:MessagesProp) {
    let messages:Array<Message> = prop.messages
    return(
        <div>
            {messages.map((m) => {
                return (
                    <div key={m.id}>
                    <div>{m.username}</div>
                    <div>{m.message}</div>
                </div>
                )
            })}
        </div>
    )
}
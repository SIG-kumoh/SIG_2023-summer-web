import {Message} from "../../config/config";

interface MessagesProp {
    messages:Array<Message>
}

export default function Messages(prop:MessagesProp) {
    let messages:Array<Message> = prop.messages
    return(
        <div>
            {messages.map((m, i) => {
                return <div key={i}>
                    <MessageBox nickname={m.nickname} text={m.text}/>
                </div>
            })}
        </div>
    )
}

function MessageBox(prop:Message) {
    return(
        <div>{prop.nickname}, {prop.text}</div>
    )
}
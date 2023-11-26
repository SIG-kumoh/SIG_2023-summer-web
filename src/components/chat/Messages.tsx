import {Message} from "../../config/config";
import {useEffect} from "react";

interface MessagesProp {
    messages:Array<Message>
}

export default function Messages(prop:MessagesProp) {
    let messages:Array<Message> = prop.messages
    useEffect(() => {
        console.log(messages)
    }, [messages]);
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
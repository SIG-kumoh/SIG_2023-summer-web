import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import ChatInfo from "./ChatInfo";
import {loginStore} from "../../store";
import {Message} from "../../config/config";
import Messages from "./Messages";

interface ChatProps {
    socket_number: number
}
export default function Chat(prop:ChatProps) {
    let socket_number:number = prop.socket_number
    let socket:any = null
    const url = ''
    const {nickname} = loginStore()
    const [message, setMessage] = useState<string>()
    const [messages, setMessages] = useState<Array<Message>>([])

    useEffect(() => {
        socket = io(url);
        socket.emit('join', {nickname, socket_number}, (err:Error) => {
            if (err) {
                alert(err);
            }
        });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [url, window.location.search]);

    useEffect(() => {
        socket.on('message', (message:Message) => {
            setMessages([...messages, message]);
        });
    }, []);

    const sendMessage = (event:React.KeyboardEvent | React.MouseEvent) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }


    return (
        <div className='outerContainer'>
            <div className='container'>
                <ChatInfo/>
                <Messages messages={messages} />
                <form className="form">
                    <input
                        className="input"
                        type="text"
                        placeholder="전송하려는 메시지를 입력하세요."
                        value={message}
                        onChange={({ target: { value } }) => setMessage(value)}
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                    <button className="sendButton" onClick={event => sendMessage(event)}>전송</button>
                </form>
            </div>
        </div>
    );
}




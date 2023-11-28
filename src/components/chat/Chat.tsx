import React, {useEffect, useState} from "react";
import {Socket, io} from "socket.io-client";
import ChatInfo from "./ChatInfo";
import {loginStore} from "../../store";
import {ChatURL, Message} from "../../config/config";
import Messages from "./Messages";

interface ChatProps {
    room_name: string
}
export default function Chat(prop:ChatProps) {
    let room_name:string = prop.room_name
    const url = ChatURL + '/chat/conn'
    const {authorization} = loginStore()
    const [text, setText] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const socketInstance = io(url, {
            extraHeaders: {Authorization : authorization}
        })
        setSocket(socketInstance)

        socketInstance.emit('join_room', {"room": room_name}, (err:Error) => {
            if (err) {
                alert(err);
            }
        });
        return () => {
            socketInstance.disconnect()
        }
    }, [url, room_name]);

    useEffect(() => {
        if (socket) {
            socket.on("message", (message: Message) => {
                setMessages(preMessages => [...preMessages, message]);
            });
            socket.on("join_room", (res: any) => {
                console.log(res)
            })
            socket.on("initialize", (res:any) => {
                console.log(res)
            })
            socket.on("leave_room", (res:any) => {
                console.log(res)
            })
            socket.on("message_disable", (res:any) => {
                console.log(res)
            })
        }

        return () => {
            if (socket) {
                socket.off("message");
            }
        };
    }, [socket]);

    const sendMessage = (event: React.KeyboardEvent | React.MouseEvent) => {
        event.preventDefault();
        if (text && socket) {
            socket.emit("message", {'room':room_name, 'message':text}, () => setText(""));
        }
    };

    return (
        <div className='chat_container'>
            <div>
                <ChatInfo/>
                <Messages messages={messages} />
                <form className="form">
                    <input
                        className="chat_input"
                        type="text"
                        placeholder="메시지를 입력하세요."
                        value={text}
                        onChange={({ target: { value } }) => setText(value)}
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                    <button className="chat_send_button" onClick={event => sendMessage(event)}>전송</button>
                </form>
            </div>
        </div>
    );
}
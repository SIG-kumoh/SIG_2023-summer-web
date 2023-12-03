import React, {useEffect, useState} from "react";
import {Socket, io} from "socket.io-client";
import {loginStore} from "../../store";
import {ChatURL, Message} from "../../config/config";
import Messages from "./Messages";

interface ChatProps {
    room_name: string
}
export default function Chat(prop:ChatProps) {
    let room_name:string = prop.room_name
    const url = ChatURL
    const {authorization} = loginStore()
    const [text, setText] = useState<string>("")
    const [messages, setMessages] = useState<Message[]>([])
    const [socket, setSocket] = useState<Socket | null>(null)
    const [curLength, setCurLength] = useState<number>(0)

    useEffect(() => {
        const socketInstance = io(url, {
            transports: ['websocket'],
            transportOptions: {
                websocket: {
                    extraHeaders: {
                        Authorization: authorization
                    }

                }
            }
        })
        setSocket(socketInstance)

        socketInstance.emit('join_room', {"room": room_name}, (err:Error) => {
            console.log("join_room")
            if (err) {
                alert(err);
            }
        });
        return () => {
            console.log("disconnect")
            socketInstance.disconnect()
        }
    }, [url, room_name]);

    useEffect(() => {
        if (socket) {
            socket.on("message", (message: Message) => {
                console.log(message)
                setMessages(preMessages => [...preMessages, message]);
            });
            socket.on("join_room", (res: any) => {
            })
            socket.on("initialize", (res:any) => {
            })
            socket.on("leave_room", (res:any) => {
            })
            socket.on("message_disable", (res:any) => {
            })
        }

        /*return () => {
            if (socket) {
                socket.off("message");
            }
        };*/
    }, [socket]);

    const sendMessage = (event: React.KeyboardEvent | React.MouseEvent) => {
        event.preventDefault();
        if (text && socket) {
            socket.emit("message", {'room':room_name, 'message':text}, () => {
                setText("")
                setCurLength(0)
            });
        }
    };

    return (
        <div className='chat_container'>
            <Messages messages={messages} />
            <div className="chat_input_container">
                <form className="form">
                    <input
                        className="chat_input"
                        type="text"
                        placeholder="채팅..."
                        value={text}
                        maxLength={100}
                        onChange={({ target: { value } }) => {
                            setText(value)
                            setCurLength(value.length)
                        }}
                        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                    />
                    <div className="chat_foot">
                        <div className="text_length">{curLength} / 100</div>
                        <button className="chat_send_button" onClick={event => sendMessage(event)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M5,12L3,3l19,9L3,21L5,12z M5.82,12.93L17,12L5.82,11.07l-1.4-6.29L19.66,12 L4.42,19.22L5.82,12.93z"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
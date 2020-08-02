import React from 'react';
import {IMessageInfo} from "../../../types/interfaces";
// @ts-ignore
import s from './ChatWindow.module.scss';

const ChatWindow = ({messages,className}:{messages:IMessageInfo[],className?:string})=>{

    const messagesTemplate = messages.map((message,index)=>{
        const date = new Date(message.time);
        return (
            <div className={s.chatWindowMessage} key = {index}>
                <div className = {s.chatHeader}>
                    <h4 className={s.chatUserName}>{message.userId}</h4>
                    <div className={s.chatTime}> {`${date.getHours()}:${date.getMinutes()}`}</div>
                </div>
                <div className={s.chatContent}>{message.text}</div>
            </div>
        );
        });

    return (
        <div className={s.chatWindow + ' ' + className}>
            <div className={s.chatWindowContainer}>
                {messagesTemplate}
            </div>
        </div>
    )
};
export default ChatWindow;

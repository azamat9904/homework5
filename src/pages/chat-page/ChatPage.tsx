import React, {FormEvent, useEffect, useState} from 'react';
// @ts-ignore
import s from './ChatPage.module.scss';
import {useWebSocket} from "../../services/chat";
import Input from "../../components/input/Input";
import ChatWindow from "./chat-window/ChatWindow";
import {IMessageInfo} from "../../types/interfaces";
import Button from "../../components/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {IChatState} from "../../redux/chatReducer/chatStateTypes";
import {sendMessageActionCreator} from "../../redux/chatReducer/chatActonCreator";

interface chatState {
    chatList:IChatState
};

const ChatPage = ()=>{
    const [inputValue,setInputValue] = useState<string>('');
    const [showEmoji,setShowEmji] = useState<boolean>(false);

    const emojiHandler = (show:boolean)=>{
        setShowEmji(show);
    };

    const selectChatState = (state:chatState)=>{
        return state.chatList;
    };

    const dispatch = useDispatch();

    const chatState = useSelector(selectChatState);

    const webSocket = useWebSocket({
        userId:'Azamat'
    });

    const onMessage = ({data}:{data:IMessageInfo})=>{
        setInputValue('');
        dispatch(sendMessageActionCreator(data));
    };

    const submitHandler = (e:FormEvent)=>{
        e.preventDefault();
        webSocket.sendMessage(inputValue);
    };

    useEffect(()=>{
        webSocket.eventEmitter.on('message',onMessage);
        return ()=>{
            webSocket.eventEmitter.off('message',onMessage);
            webSocket.close();
        }
    },[]);


    return (
        <div className={s.chatPage}>
            <ChatWindow messages = {chatState.messages} className={s.chatPageWindow}/>
            <form onSubmit={submitHandler} className={s.chatPageForm}>
                <Input
                    type="text"
                    placeholder="Enter your text"
                    onHandler={(value)=>setInputValue(value)}
                    required={false}
                    value = {inputValue}
                    emojiRequired={true}
                />
                <Button type = "button" text="Send" className={s.chatBtn}/>
            </form>
        </div>
    )
};
export default ChatPage;

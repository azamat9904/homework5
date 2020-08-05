import React, {FormEvent, MutableRefObject, useEffect, useReducer, useState} from 'react';
// @ts-ignore
import s from './ChatPage.module.scss';
import {chatStateReducer, useWebSocket} from "../../services/chat";
import Input from "../../components/input/Input";
import ChatWindow from "./chat-window/ChatWindow";
import {IMessageInfo} from "../../types/interfaces";
import Button from "../../components/button/Button";
import {BaseEmoji} from "emoji-mart";
import {ChatActions} from "../../services/chat";
import {UserInfo} from "../../types/interfaces";

type Props = {
    user?: UserInfo | null;
}

const ChatPage:React.FunctionComponent<Props> = ({user}) => {
    const [state, dispatch] = useReducer(chatStateReducer, {messages: []});

    const [inputValue, setInputValue] = useState<string>('');

    const webSocket = useWebSocket({
        userId: user?.firstname
    });

    const getEmojiHandler = (emoji: BaseEmoji) => {
        setInputValue(inputValue + emoji.native);
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        setInputValue('');
        webSocket.sendMessage(inputValue);
    };


    const onMessage = ({data}: { data: IMessageInfo }) => {
        dispatch({
            type: ChatActions.ADD_MESSAGE,
            payload: data,
        })
    };

    useEffect(() => {
        webSocket.open();
        webSocket.eventEmitter.on('message', onMessage);
        return () => {
            webSocket.eventEmitter.off('message', onMessage);
            webSocket.close();
        }
    }, []);


    return (
        <div className={s.chatPage}>
            <ChatWindow messages={state.messages} className={s.chatPageWindow}/>
            <form onSubmit={submitHandler} className={s.chatPageForm}>
                <Input
                    type="text"
                    placeholder="Enter your text"
                    onHandler={(value) => setInputValue(value)}
                    required={false}
                    value={inputValue}
                    emojiRequired={true}
                    getEmojiHandler={getEmojiHandler}
                />
                <Button type="submit" text="Send" className={s.chatBtn}/>
            </form>
        </div>
    )
};
export default ChatPage;

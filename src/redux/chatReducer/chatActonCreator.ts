import {IMessageInfo} from "../../types/interfaces";
import {chatStateEnum, ChatActionTypes} from "./chatStateTypes";

export function sendMessageActionCreator(newMessage:IMessageInfo):ChatActionTypes{
    return {
        type:chatStateEnum.SEND_MESSAGE,
        payload:newMessage
    }
}

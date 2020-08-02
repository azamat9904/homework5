import {IMessageInfo} from "../../types/interfaces";

export enum chatStateEnum {
    SEND_MESSAGE="SEND_MESSAGE"
}

export interface IChatState {
    messages:IMessageInfo[]
}

interface ISendMessageActionCreator{
    type:typeof chatStateEnum.SEND_MESSAGE,
    payload:IMessageInfo
}

export type ChatActionTypes = ISendMessageActionCreator;


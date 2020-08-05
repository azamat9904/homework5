import React from 'react';
import {IMessageInfo, IWebsocketConfig} from "../types/interfaces";
import {EventEmitter} from "events";
import {useEffect, useState} from "react";

class SocketClient {
    private static instance:SocketClient | undefined;
    private reconnectTimeout:any;

    webSocket:WebSocket | undefined;
    eventEmitter = new EventEmitter();

    constructor(private config:IWebsocketConfig) {
        this.init();
    }

    static getInstance(config:IWebsocketConfig){
        if(!this.instance) this.instance = new SocketClient(config);
        return this.instance;
    }

    init(){
        this.webSocket = new WebSocket(`${this.config.url}?room=${this.config.room}&userId=${this.config.userId}`);
        this.webSocket.addEventListener('open',()=>this.onOpen());
        this.webSocket.addEventListener('close',()=>this.onClose());
        this.webSocket.addEventListener('message',(e)=>this.onMessage(e));
    }

    onOpen(){
        console.log('WEBSOCKET OPENED');
        if(this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    }

    onClose(){
        console.log('WEBSOCKET ClOSED');
        if(this.config.reconnect){
            this.reconnectTimeout = setTimeout(()=>
                this.init(),5000);
        }
    }

    onMessage(e:MessageEvent){
        console.log(e);
        const message = JSON.parse(e.data);
        this.eventEmitter.emit(message.type,{data:message.data});
    }

    sendMessage(value:string){
        const message = {event:"message",data:value};
        this.webSocket?.send(JSON.stringify(message));
    }

    close(){
        if(this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
        this.config.reconnect = false;
        this.webSocket?.close();
    }

    open(){
        if(this.webSocket?.readyState === WebSocket.CLOSED){
            this.init();
        }
    }
}

const defaultConfig:IWebsocketConfig = {
    url: 'wss://zaaz-live.dar-dev.zone',
    reconnect: true,
    userId: 'Azamat',
    room: 'DAR123',
};

export const useWebSocket = (externalConfig:Partial<IWebsocketConfig>)=>{
    const config = {...defaultConfig,...externalConfig};
    const [webSocketInstance,setWebSocketInstance] = useState<SocketClient>(SocketClient.getInstance(config));

    useEffect(()=>{
        setWebSocketInstance(SocketClient.getInstance(config));
    },[webSocketInstance?.webSocket]);

    return webSocketInstance;
};



export enum ChatActions {
    ADD_MESSAGE = 'ADD_MESSAGE',
}

export interface ChatState {
    messages: IMessageInfo[]
}

export const chatStateReducer = (state: ChatState, action: {type: ChatActions, payload: any}) => {
    switch(action.type) {
        case ChatActions.ADD_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }
        default:
            return state;
    }

};

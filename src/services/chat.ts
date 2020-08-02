import {IWebsocketConfig} from "../types/interfaces";
import {EventEmitter} from "events";
import {useEffect, useState} from "react";

class SocketClient {
    private static instance:SocketClient | undefined;
    private reconnectTimeout:any;
    public webSocket:WebSocket | undefined;
    public eventEmitter = new EventEmitter();

    constructor(private config:IWebsocketConfig) {
        this.init(config);
    }

    static getInstance(config:IWebsocketConfig){
        if(!this.instance) this.instance = new SocketClient(config);
        return this.instance;
    }

    init(config:IWebsocketConfig){
        this.webSocket = new WebSocket(`${config.url}?room=${config.room}&userId=${config.userId}`);
        this.webSocket.addEventListener('open',()=>this.onOpen());
        this.webSocket.addEventListener('close',()=>this.onClose());
        this.webSocket.addEventListener('message',(e)=>this.onMessage(e));
    }

    onOpen(){
        console.log('WEBSOCKET OPENED');
        if(this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    }

    onClose(){
        console.log('WEBSOCKET ClOSED   ');
        if(this.config.reconnect){
            this.reconnectTimeout = setTimeout(()=>
                this.init(this.config),5000);
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
}

const defaultConfig:IWebsocketConfig = {
    userId:'Azamat',
    url: 'ws://zaaz-live.dar-dev.zone',
    room:'DAR123',
    reconnect:true
};

export const useWebSocket = (externalConfig:Partial<IWebsocketConfig>)=>{
    const config = {...defaultConfig,...externalConfig};
    const [webSocketInstance,setWebSocketInstance] = useState<SocketClient>(SocketClient.getInstance(config));

    useEffect(()=>{
        setWebSocketInstance(SocketClient.getInstance(config));
    },[webSocketInstance?.webSocket?.readyState]);

    return webSocketInstance;
};

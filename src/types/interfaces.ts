//Post Interface
import {Emoji} from "emoji-mart/dist-es/utils/data";
import {BaseEmoji, EmojiData} from "emoji-mart";
import {MutableRefObject} from "react";

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}


//Loader interface
type LoaderTypes =
    | 'Audio'
    | 'BallTriangle'
    | 'Bars'
    | 'Circles'
    | 'Grid'
    | 'Hearts'
    | 'Oval'
    | 'Puff'
    | 'Rings'
    | 'TailSpin'
    | 'ThreeDots'
    | 'Watch'
    | 'RevolvingDot'
    | 'Triangle'
    | 'Plane'
    | 'MutatingDots'
    | 'None'
    | 'NotSpecified';


export interface ILoader {
    color?: string;
    height?: number;
    width?: number;
    timeout?: number;
    type?:LoaderTypes
}


//Button interface
type ButtonTypes =
    |'button'
    |'submit'
    |'reset'


export interface IButton {
    className?:string;
    onHandler?:()=>void;
    type?:ButtonTypes;
    text:string
}

//Input Interface
type InputTypes =
    | 'text'
    | 'checkbox'
    | 'email'
    | 'password';


export interface IInput {
    type:InputTypes;
    onHandler:(value:string)=>void;
    className?:string,
    placeholder?:string;
    required?:boolean,
    value:string,
    emojiRequired?:boolean,
    getEmojiHandler?:(emoji:BaseEmoji)=>void;
}

export interface IInputError {
    isEmpty?:boolean;
    isInvalid?:boolean;
}

//Websocket Interface
export interface IWebsocketConfig {
    url: string;
    room: string;
    userId: string;
    reconnect: boolean,
}

//Message Interface
export interface IMessageInfo {
    roomId:string;
    text:string;
    time:string;
    userId:string
}

//Youtube interface
type playerVars = {
    autoplay?:1 | 0;
    color?:'red' | 'white';
    controls?:0 | 1 | 2;
    disablekb?:0 | 1;
    enablejsapi?: 0 | 1;
    fs?:0 | 1;
}
export interface IYoutube {
    videoId:string;
    opts:{
        height:string,
        width: string,
        playerVars?:playerVars
    }
}


// Emoji type
export interface IEmoji {
    colons:string;
    emoticonst:[];
    id:string;
    name:string;
    native:string;

}

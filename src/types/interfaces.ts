//Post Interface
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
    onHandler?:(value:string)=>void;
    className?:string,
    placeholder?:string;
}

export interface IInputError {
    isEmpty?:boolean;
    isInvalid?:boolean;
}



export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

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

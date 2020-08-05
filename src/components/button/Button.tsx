import React from 'react';
import {IButton} from "../../types/interfaces";

const Button:React.FunctionComponent<IButton> = ({type,className,onHandler,text,withChildren,children})=>{
    return (
        <button className = {'Button '+ className} onClick={onHandler} type = {type}>{withChildren ?  children : text}</button>
    )
};
export default Button;

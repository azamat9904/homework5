import React from 'react';
import {IButton} from "../../types/interfaces";

const Button:React.FunctionComponent<IButton> = ({type,className,onHandler,text})=>{
    return (
        <button className = {'Button '+ className} onClick={onHandler} type = {type}>{text}</button>
    )
};
export default Button;

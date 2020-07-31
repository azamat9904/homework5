import React from 'react';
import LoaderLibrary from 'react-loader-spinner'
import {ILoader} from "../../types/interfaces";

const initialConfig:ILoader = {
    type:"BallTriangle",
    color:"#00BFFF",
    height:100,
    width:100,
    timeout:3000
};

const Loader:React.FunctionComponent<ILoader> = (props)=>{
    const config = {...initialConfig,...props};
    return (
        <div className="LoaderContainer">
            <LoaderLibrary
                type = {config.type}
                color = {config.color}
                height={config.height}
                width={config.width}
                timeout={config.timeout}
            />
        </div>
    )
};
export default Loader;

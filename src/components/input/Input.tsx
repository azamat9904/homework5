import React, {useEffect, useState} from 'react';
import {IInput,IInputError} from "../../types/interfaces";

const Input:React.FunctionComponent<IInput> = ({type,onHandler,className,placeholder})=>{

    const [inputValue,setInputValue] = useState<string>('');
    const [errors,setErrors] = useState<IInputError>({isEmpty:false,isInvalid:false});
    const [touched,setTouched] = useState<boolean>(false);

    const inputHandler = (value:string)=>{
        setInputValue(value);
        if(onHandler) onHandler(value);
    };

    useEffect(()=>{
        setTouched(true);
        if(!touched)return;

        if(!inputValue){
            setErrors({
                isEmpty:true,
                isInvalid:false
            });
            return;
        }

        if(inputValue.match(/\s/g)){
            setErrors({
                isEmpty:false,
                isInvalid:true
            });
            return;
        }

        setErrors({
            isEmpty:false,
            isInvalid:false
        });

    },[inputValue]);

    return (
        <div className='inputContainer'>
            <input type={type} value = {inputValue} onChange = {(event)=>inputHandler(event.target.value)} className={'input ' + className} placeholder={placeholder}/>
            { errors.isEmpty || errors.isInvalid ?
                <div className="inputErrors">
                    {
                        errors.isEmpty? <span className="inputError">*The field is empty</span> :
                            <span className="inputError">*The field is invalid</span>
                    }
                </div>
                :''
            }
        </div>
    )
};

export default Input;

import React, {MutableRefObject, useEffect, useState} from 'react';
import {IInput,IInputError} from "../../types/interfaces";
import Emoji from "../emoji/emoji";
import {BaseEmoji} from "emoji-mart";
const Input:React.FunctionComponent<IInput> = (
    {type,
        onHandler,
        className,
        placeholder,
        required,
        value,
        emojiRequired,
        getEmojiHandler
    })=>{

    const [errors,setErrors] = useState<IInputError>({isEmpty:false,isInvalid:false});
    const [touched,setTouched] = useState<boolean>(false);
    const [showEmojiPicker,setShowEmojiPicker] = useState<boolean>();

    const showEmojiPickerHandler = ()=>{
        setShowEmojiPicker(!showEmojiPicker);
    };

    const inputHandler = (value:string)=>{
        onHandler(value);
    };

    useEffect(()=>{
        setTouched(true);
        if(!touched)return;

        if(required && !value){
            setErrors({
                isEmpty:true,
                isInvalid:false
            });
            return;
        }

        if(required && value.match(/\s/g)){
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

    },[value]);

    return (
        <div className='inputContainer'>
            <input
                type={type}
                value = {value}
                onChange = {(event)=>inputHandler(event.target.value)}
                className={'input ' + className}
                placeholder={placeholder}
            />
            { errors.isEmpty || errors.isInvalid ?
                <div className="inputErrors">
                    {
                        errors.isEmpty? <span className="inputError">*The field is empty</span> :
                            <span className="inputError">*The field is invalid</span>
                    }
                </div>
                :''
            }
            {
                emojiRequired &&
                <span className="emoji">
                    <img
                        src="./emoji.png"
                        alt="emoji"
                        className="emojiIcon"
                        onClick = {()=>showEmojiPickerHandler()}
                    />
                </span>
            }
            {
                showEmojiPicker && <Emoji getEmojiHandler={getEmojiHandler}/>
            }
        </div>
    )
};

export default Input;

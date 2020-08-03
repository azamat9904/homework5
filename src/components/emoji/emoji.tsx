import React, {MutableRefObject, useRef} from 'react';
import 'emoji-mart/css/emoji-mart.css';
import {BaseEmoji, Picker} from 'emoji-mart';

const Emoji = ({getEmojiHandler}:{getEmojiHandler?:(emoji:BaseEmoji)=>void})=>{
    const addEmoji = (emoji:BaseEmoji)=>{
        getEmojiHandler?.(emoji);
    };

    return (
        <div className = "emojiPicker">
            <Picker set='apple' title='Pick your emoji…' emoji='point_up' onSelect={addEmoji}/>
        </div>
    )
};
export default Emoji;

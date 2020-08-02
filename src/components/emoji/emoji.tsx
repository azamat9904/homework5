import React from 'react';
import Picker, {IEmojiData, SKIN_TONE_MEDIUM_DARK} from 'emoji-picker-react';

const Emoji = ()=>{
    const onEmojiClick = (event:Event, emojiObject:IEmojiData) => {
        console.log(emojiObject);
    };

    return (
        <div>
            <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true}/>
        </div>
    )
};
export default Emoji;

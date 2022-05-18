import React, { useEffect, useState } from "react";
import "./ChatListItem.css";

const ChatListItem = ({ click, active, data }) => {
    const [time, setTime] = useState("");
    useEffect(() => {
        if (data.lastMessageDate > 0) {
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
    }, [data]);

    return (
        // Mostra a lista das conversas
        <div
            onClick={click}
            className={`chatListItem ${active ? "active" : ""}`}
        >
            <img
                className='chatListItem--avatar'
                src={data.image}
                alt='avatar'
            />
            <div className='chatListItem--lines'>
                <div className='chatListItem--line'>
                    <div className='chatListItem--name'>
                        {data.title}
                    </div>
                    <div className='chatListItem--date'>{time}</div>
                </div>

                <div className='chatListItem--line'>
                    <div className='chatListItem--lastMsg'>
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatListItem;

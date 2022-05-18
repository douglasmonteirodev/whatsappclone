import React, { useState, useEffect } from "react";
import "./NewChat.css";

import Api from "../Api";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NewChat = ({ user, chatlist, show, setShow }) => {
    /*_______State da lista do chat_______*/
    const [list, setList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            if (user !== null) {
                let results = await Api.getContactList(user.id);
                setList(results);
            }
        };
        getList();
    }, [user]);

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);
        handleClose();
    };

    /*_____Fecha o chat_______*/
    const handleClose = () => {
        setShow(false);
    };

    return (
        <div className='newChat' style={{ left: show ? 0 : -415 }}>
            {/* inicio */}
            <div className='newChat--head'>
                {/* _______Header________ */}
                <div
                    onClick={handleClose}
                    className='newChat--backbutton'
                >
                    <ArrowBackIcon style={{ color: "#fff" }} />
                </div>
                <div className='newChat--headtitle'>
                    Nova Conversa
                </div>
            </div>

            {/* __________Body_____________ */}
            <div className='newChat--list'>
                {list.map((item, key) => (
                    <div
                        onClick={() => addNewChat(item)}
                        className='newChat--item'
                        key={key}
                    >
                        <img
                            className='newChat--itemavatar'
                            src={item.avatar}
                        />
                        <div className='newChat--itemname'>
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
            {/*fim*/}
        </div>
    );
};

export default NewChat;

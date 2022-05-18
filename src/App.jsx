import React, { useState, useEffect } from "react";
import "./App.css";

import Api from "./Api";

import ChatListItem from "./components/ChatListItem";
import ChatIntro from "./components/ChatIntro";
import ChatWindow from "./components/ChatWindow";
import NewChat from "./components/NewChat";
import Login from "./components/Login";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

const App = () => {
    const [chatList, setChatList] = useState([]);

    const [activeChat, setActiveChat] = useState({});
    const [user, setUser] = useState({
        id: "lsc9oyWnnDdIxA0D6SCsppjQPjJ2",
        name: "Ciclano",
        avatar: "https://avatars.githubusercontent.com/u/95188428?s=400&u=ea954c1c065aca80b7e9be203db2b3032a53ed12&v=4",
    });
    const [showNewChat, setShowNewChat] = useState(false);

    useEffect(() => {
        if (user !== null) {
            let unsub = Api.onChatList(user.id, setChatList);
            return unsub;
        }
    }, [user]);

    const handleNewChat = () => {
        setShowNewChat(true);
    };

    const handleLoginData = async (u) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL,
        };
        await Api.addUser(newUser);
        setUser(newUser);
    };

    if (user === null) {
        return <Login onReceive={handleLoginData} />;
    }

    return (
        <div className='app-window'>
            <div className='sidebar'>
                {/* _________________________________________________________________ */}
                <NewChat
                    chatList={chatList}
                    user={user}
                    show={showNewChat}
                    setShow={setShowNewChat}
                />
                {/* _________________________________________________________________ */}
                <header>
                    <img className='header--avatar' src={user.avatar} alt='avatar' />
                    <div className='header--buttons'>
                        <div className='header--btn'>
                            <DonutLargeIcon style={{ color: "#919191" }} />
                        </div>
                        <div className='header--btn' onClick={handleNewChat}>
                            <ChatIcon style={{ color: "#919191" }} />
                        </div>
                        <div className='header--btn'>
                            <MoreVertIcon style={{ color: "#919191" }} />
                        </div>
                    </div>
                </header>
                {/* _________________________________________________________________ */}
                <div className='search'>
                    <div className='search--input'>
                        <SearchIcon style={{ color: "#919191" }} fontSize='small' />
                        <input
                            type='search'
                            placeholder='Procurar ou começar nova conversa'
                        />
                    </div>
                </div>
                {/* _________________________________________________________________ */}
                <div className='chatList'>
                    {chatList.map((item, key) => (
                        <ChatListItem
                            key={key}
                            data={item}
                            active={activeChat.chatId === chatList[key].chatId}
                            click={() => setActiveChat(chatList[key])}
                        />
                    ))}
                </div>
            </div>

            {/* ___________________________________________________________________ */}
            <div className='contentarea'>
                {activeChat.chatId !== undefined && (
                    <ChatWindow user={user} data={activeChat} />
                )}
                {activeChat.chatId === undefined && <ChatIntro />}
            </div>
        </div>
    );
};

export default App;

import React, { useState, useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import EmojiPicker from "emoji-picker-react";
import "./ChatWindow.css";

import Api from "../Api";

import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";

const ChatWindow = ({ user, data }) => {
    const body = useRef();

    /*_________________STATES_______________________*/
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState("");
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setList([]);
        let unsub = Api.onChatContent(data.chatId, setList, setUsers);
        return unsub;
    }, [data.chatId]);

    /* ________Barra de rolagem de acordo com ultima msg_________*/
    useEffect(() => {
        if (body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop =
                body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list]);

    /*_______________Abre a janela dos emojis___________________ */
    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    };

    /* ____________Fecha a janela dos emojis_____________________ */
    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    };

    /*________Dar vida aos emojis__________*/
    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji);
    };
    /*____________________________________*/

    /*____________FUNCIONAMENTO DO MIC______________*/

    const handleMicClick = () => {
        let recognition = null;
        let SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (SpeechRecognition !== undefined) {
            recognition = new SpeechRecognition();
        }

        if (recognition !== null) {
            recognition.onstart = () => {
                setListening(true);
            };
        }
        recognition.onend = () => {
            setListening(false);
        };
        recognition.onresult = (e) => {
            setText(e.results[0][0].transcript);
        };
        recognition.start();
    };

    const handleInputKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSendClick();
        }
    };

    const handleSendClick = () => {
        if (text !== "") {
            Api.sendMessage(data, user.id, "text", text, users);
            setText("");
            setEmojiOpen(false);
        }
    };

    return (
        <div className='chatWindow'>
            {/* _________Header da janela das mensagens___________ */}
            <div className='chatWindow--header'>
                {/* ==============Foto da pessoa============== */}
                <div className='chatWindow--headerinfo'>
                    <img
                        className='chatWindow--avatar'
                        src={data.image}
                        alt=''
                    />
                    <div className='chatWindow--name'>
                        {data.title}
                    </div>
                </div>
                {/*===============Icones no lado direito================== */}
                <div className='chatWindow--headerbuttons'>
                    <div className='chatWindow--btn'>
                        <SearchIcon style={{ color: "#919191" }} />
                    </div>
                    <div className='chatWindow--btn'>
                        <AttachFileIcon
                            style={{ color: "#919191" }}
                        />
                    </div>
                    <div className='chatWindow--btn'>
                        <MoreVertIcon style={{ color: "#919191" }} />
                    </div>
                </div>
            </div>

            {/* ______________Body____________________ */}
            <div ref={body} className='chatWindow--body'>
                {list.map((item, key) => (
                    <MessageItem key={key} data={item} user={user} />
                ))}
            </div>

            {/* ____________Area dos emojis__________ */}
            <div
                className='chatWindow--emojiarea'
                style={{ height: emojiOpen ? "200px" : "0" }}
            >
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            {/* _________________Footer_________________ */}
            <div className='chatWindow--footer'>
                {/* ========= lado Esquerdo========== */}
                <div className='chatWindow--pre'>
                    <div
                        className='chatWindow--btn'
                        onClick={handleCloseEmoji}
                        style={{ width: emojiOpen ? "40px" : "0" }}
                    >
                        <CloseIcon style={{ color: "#919191" }} />
                    </div>

                    <div
                        className='chatWindow--btn'
                        onClick={handleOpenEmoji}
                    >
                        <InsertEmoticonIcon
                            style={{
                                color: emojiOpen
                                    ? "#009688"
                                    : "#919191",
                            }}
                        />
                    </div>
                </div>

                {/* ===============Centro=============== */}
                <div className='chatWindow--inputarea'>
                    <input
                        type='text'
                        className='chatWindow--input'
                        placeholder='Digite uma mensagem'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyUp={handleInputKeyUp}
                    />
                </div>

                {/* =========Lado Direito======= */}
                <div className='chatWindow--pos'>
                    {text === "" && (
                        <div
                            onClick={handleMicClick}
                            className='chatWindow--btn'
                        >
                            <MicIcon
                                style={{
                                    color: listening
                                        ? "#126ece"
                                        : "#919191",
                                }}
                            />
                        </div>
                    )}
                    {text !== "" && (
                        <div
                            onClick={handleSendClick}
                            className='chatWindow--btn'
                        >
                            <SendIcon style={{ color: "#919191" }} />
                        </div>
                    )}
                </div>
                {/* $$ */}
            </div>
        </div>
    );
};

export default ChatWindow;

import React from "react";
import "./ChatIntro.css";

const ChatIntro = () => {
    return (
        // Carrega o fundo do whats antes de abrir uma conversa
        <div className='chatIntro'>
            <img
                src='https://teletime.com.br/wp-content/uploads/2015/09/Captura-de-Tela-2015-09-04-%C3%A0s-12.25.44.png'
                alt=''
            />
            <h1>Mantenha seu celular conectado</h1>
            <h2>
                O WhatsApp conecta ao seu telefone para sincronizar
                suas mensagens. <br /> Para reduzir o uso dos seus
                dados, conecte seu telefone a uma rede Wi-Fi
            </h2>
        </div>
    );
};

export default ChatIntro;

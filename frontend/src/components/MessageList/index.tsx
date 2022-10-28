import io from "socket.io-client";
import { api } from "../../service/api";
import style from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";
import { useEffect, useState } from "react";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};

/* Criando uma fila de messagens */
const messageQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  //console.log(newMessage);
  messageQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messageQueue.length > 0) {
        setMessages((prevState) =>
          [messageQueue[0], prevState[0], prevState[1]].filter(Boolean)
        );

        messageQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<Message[]>("messages/last3").then((response) => {
      //console.log(response.data);
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={style.messageListWraper}>
      <img src={logoImg} alt="DoWhile2021" />

      <ul className={style.messageList}>
        {messages.map((message) => {
          return (
            <li key={message.id} className={style.message}>
              <p className={style.messageContent}>{message.text}</p>
              <div className={style.messageUser}>
                <div className={style.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}

        {/*  <li className={style.message}>
          <p className={style.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={style.messageUser}>
            <div className={style.userImage}>
              <img
                src="https://github.com/salvatoreDeploy.png"
                alt="Henrique Araujo"
              />
            </div>
            <span>Henrique Araujo</span>
          </div>
        </li> */}

        {/* <li className={style.message}>
          <p className={style.messageContent}>
            Não vejo a hora de começar esse evento, com certeza vai ser o melhor
            de todos os tempos, vamooo pra cima! 🔥🔥
          </p>
          <div className={style.messageUser}>
            <div className={style.userImage}>
              <img
                src="https://github.com/salvatoreDeploy.png"
                alt="Henrique Araujo"
              />
            </div>
            <span>Henrique Araujo</span>
          </div>
        </li> */}
      </ul>
    </div>
  );
}

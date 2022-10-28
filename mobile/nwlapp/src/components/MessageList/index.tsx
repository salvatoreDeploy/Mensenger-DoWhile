import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

import { ScrollView } from "react-native";
import { api } from "../../services/api";

import { Message, MessageProps } from "../Message";

import { styles } from "./styles";

import { MESSAGES_EXAMPLE } from "../../utils/messages";

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));

socket.on("new_message", (newMessage) => {
  messagesQueue.push(newMessage);

  console.log(newMessage);
});

export function MessageList() {
  /* const message = {
    id: "1",
    text: "messagem de teste",
    user: {
      name: "Teste",
      avatar_url: "https://github.com/salvatoreDeploy.png",
    },
  }; */

  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>("/messages/last3");
      setCurrentMessages(messagesResponse.data);
    }
    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {/* <Message data={message} />
      <Message data={message} />
      <Message data={message} /> */}

      {currentMessages.map((message, interator) => {
        return <Message key={interator} data={message} />;
      })}
    </ScrollView>
  );
}

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoArrowBack } from "react-icons/io5";
import { Inbox, Message } from '@/interface/inbox/inbox';
import axios from 'axios';
import BubbleChat from '../bubbleChat/BubbleChat';

type Props = {
  idMessage: number | undefined,
  setChatIsOpen: (e: boolean) => void,

}

function ChatFeed({ idMessage, setChatIsOpen }: Props) {
  const [feedMessage, setFeedMessage] = useState<Inbox>();
  const [messageChat, setMessageChat] = useState<Message[]>();
  const [newMessage, setNewMessage] = useState<string>("");
  
  useEffect(() => {
    async function getInboxById() {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/inbox?id=${idMessage}`)
      setFeedMessage(res.data.data);
      };
      
      getInboxById();
      }, [idMessage])
      
      useEffect(() => { 
        setMessageChat(feedMessage?.message);
        }, [feedMessage])
        
  const renderedBubbleChat = messageChat?.map((message) => {
    const alignStyle = message.sender === 'user' ? "items-end" : "items-start";
    return (
      <div key={message.idMessage} className={`flex flex-col w-full ${alignStyle}`}>
        <BubbleChat key={message.idMessage} message={message}/>
      </div>
    );
  });

  const handleCloseChat = () => {
    setChatIsOpen(false);
  }

  const handleNewMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  }

  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();

    const newMessageObj: Message = {
      idMessage: messageChat?.length ? (messageChat.length + 1) : 1,
      sender: "user",
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessageChat((prevMessages) => prevMessages ? [...prevMessages, newMessageObj] : [newMessageObj]);
    setNewMessage("");
  }


  return (
    <div className="h-full w-full">
      {/* Header */}
      <div className="h-[73px] border-b border-primary-grey flex items-center">
        <button className="basis-1/12 pl-5" onClick={() => handleCloseChat()}>
          <IoArrowBack size={28}/>
        </button>
        <div className="basis-10/12 pl-[14px]">
          <h1 className="text-primary-blue font-bold text-base">{feedMessage?.title}</h1>
          <p className="text-sm">{feedMessage?.participants.length} Participants</p>
        </div>
        <button className="basis-1/12 pr-5 text-sm" onClick={() => handleCloseChat()}>
          <RxCross2 size={28}/>
        </button>
      </div>
      {/* body */}
      <div className='pr-9 pl-5 flex flex-col h-[584px] overflow-auto'>
        {/* BubbleChat rendered */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-primary-background">Today June 09, 2021</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-col gap-4">
          {renderedBubbleChat}
        </div>
      </div>
      <form
        className="flex flex-row pr-9 pl-5 h-20  justify-center items-center gap-3"
        onSubmit={handleSubmitMessage}
      >
        <input 
          type="text"
          placeholder="type a new message"
          className="h-10 w-[580px] rounded border-primary-black"
          onChange={handleNewMessageChange}
          value={newMessage} 
        />
        <button 
          className='h-10 w-[76px] bg-primary-blue text-white rounded'
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatFeed
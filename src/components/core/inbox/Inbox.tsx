import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/UI/searchBar/SearchBar'
import axios from 'axios'
import { Inbox } from '@/interface/inbox/inbox';
import ChatList from '@/components/UI/chat/chatList/ChatList';
import Loading from '@/components/UI/loading/Loading';
import ChatFeed from '@/components/UI/chat/chatFeed/ChatFeed';

/* 
  data get from api /api/inbox
  Data combine using api from https://jsonplaceholder.typicode.com/users?_limit=4 
  and dummy hardcode in api/inbox for message data
*/

function QuicksInbox() {
  const [inboxData, setInboxData] = useState<Inbox[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatIsOpen, setChatIsOpen] = useState<boolean>(false);
  const [idMessage, setIdMessage] = useState<number | undefined>();

  useEffect(() => {
    async function getInbox() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/inbox`);
        setInboxData(res.data.data);
        await setIsLoading(false);
      } catch (err) {
        console.log("ERROR FETCHING DATA");
      }
    }
    
    getInbox();
  }, [])
  
  // Delete When Done
  useEffect(() => {
    console.log(chatIsOpen);
    console.log(idMessage);
  }, [chatIsOpen, idMessage]);

  return (
    <div className="h-full w-full">
      {/* Chat List */}
      <div className={`${chatIsOpen ? "hidden" : ""} px-8 py-6 `}>
        <SearchBar />
        {
          isLoading ? <Loading /> : 
          <ChatList 
            data={inboxData}
            setChatIsOpen={setChatIsOpen} 
            setIdMessage={setIdMessage}
          />
        }
      </div>

      {/* Chat Feed */}
      <div className={`${chatIsOpen ? "" : "hidden"}`}>
        {chatIsOpen && <ChatFeed idMessage={idMessage} setChatIsOpen={setChatIsOpen}/>}
      </div>
    </div>
  )
}

export default QuicksInbox;
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const inboxData = [
    {
        idMessage: 1,
        sender: "Bret",
        message: 'Don\'t forget about our meeting tomorrow at 10 AM.',
        timestamp: new Date().toISOString()
      },
      {
        idMessage: 2,
        sender: "Bret",
        message: 'The project is progressing well, we\'re ahead of schedule.',
        timestamp: new Date().toISOString()
      },
      {
        idMessage: 3,
        sender: "Bret",
        message: 'Please submit your annual review by the end of the week.',
        timestamp: new Date().toISOString()
      },
      {
        idMessage: 4,
        sender: "Anthonet",
        message: 'Are we still on for hiking this weekend?',
        timestamp: new Date().toISOString()
      }
];

const headerChat = [
    {
        id: 1234,
        header: "Valo To The Rescue" 
    },
    {
        id: 23452,
        header: "Interview Group",
    },
    {
        id: 124124,
        header: "Recent Communications"
    },
];

// get only user and id from "https://jsonplaceholder.typicode.com/users?_limit=4"
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id');

    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/users?_limit=4"
    );
  
    const users = res.data;
    const userSummaries = users.map((user: any) =>( {
      userId: user.id,
      username: user.username
    }));

    // combine the inbox 
    const inboxResponse = headerChat.map((inbox) => ({
        id: inbox.id,
        title: inbox.header,
        participants: userSummaries,
        message: inboxData
    }));
    console.log(id);
    if (id) {
        const selectedMessage = inboxResponse.find(message => message.id.toString() === id);
        if (selectedMessage) {
            return NextResponse.json({ status: 200, data: selectedMessage });
        } else {
            return NextResponse.json({ status: 404, message: 'Message not found' });
        }
    }

    return NextResponse.json({ status: 200, data: inboxResponse });
  }
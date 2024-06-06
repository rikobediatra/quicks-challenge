export interface Message {
  idMessage: number;
  sender: string,
  message: string;
  timestamp: string;
}

export interface User {
  id: number;
  username: string;
}

export interface Inbox {
  id: number;
  title: string;
  participants: User[];
  message: Message[];
}

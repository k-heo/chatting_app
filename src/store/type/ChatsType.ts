export type initialChatsType = {
  isChatsData: Chats[];
};

export type Chats = {
  id: string;
  roomd_id: string;
  user_id: string;
  message: string;
  createdAt: string;
};

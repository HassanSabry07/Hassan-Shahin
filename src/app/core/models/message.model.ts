export interface IMessage {
  _id?: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt?: string;
}
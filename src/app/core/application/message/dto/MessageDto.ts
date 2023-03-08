import { MessageUserDto } from './MessageUserDto';

export type MessageDto = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: MessageUserDto;
};

import { UserDto } from './UserDto';

export type MessageDto = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserDto;
};

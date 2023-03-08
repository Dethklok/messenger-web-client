import { User } from './user.entity';

export class Message {
  constructor(
    readonly id: number,
    readonly content: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly user: User
  ) {}
}

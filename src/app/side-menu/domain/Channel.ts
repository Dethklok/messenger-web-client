export class Channel {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}

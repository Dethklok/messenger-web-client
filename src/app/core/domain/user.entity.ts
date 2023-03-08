export class User {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly firstName?: string,
    readonly lastName?: string
  ) {}

  get avatarSrc(): string {
    return '';
  }

  getFullName(): string {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    }

    return this.username;
  }
}

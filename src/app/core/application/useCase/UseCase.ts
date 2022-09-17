export abstract class UseCase<Args, Return = void> {
  abstract execute(args: Args): Return;
}

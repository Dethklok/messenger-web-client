import { UseCase } from 'app/core/application/common/UseCase';

export abstract class AsyncUseCase<Args, Return = void>
  implements UseCase<Args, Promise<Return>>
{
  abstract execute(args: Args): Promise<Return>;
}

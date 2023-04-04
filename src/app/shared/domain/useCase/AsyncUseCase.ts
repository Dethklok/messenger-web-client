import { UseCase } from 'app/shared/domain/useCase/UseCase';

export abstract class AsyncUseCase<Args, Return = void>
  implements UseCase<Args, Promise<Return>>
{
  abstract execute(args: Args): Promise<Return>;
}

import { IStudioDTO } from '../dtos/IStudioDTO';

export interface IStudioRepository {
  createStudio(name: string): Promise<IStudioDTO>;
  findByName(name: string): Promise<IStudioDTO>;
}

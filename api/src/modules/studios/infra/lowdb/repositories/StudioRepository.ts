import { IStudioDTO } from '@src/modules/studios/dtos/IStudioDTO';
import { IStudioRepository } from '@src/modules/studios/repositories/IStudioRepository';
import db from '@src/shared/infra/lowdb/db';
import { v4 as uuidv4 } from 'uuid';

export default class StudioRepository implements IStudioRepository {
  async createStudio(name: string): Promise<IStudioDTO> {
    return db.get('studios').push({ id: uuidv4(), name }).write();
  }

  async findByName(name: string): Promise<IStudioDTO> {
    const studio = db.get('studios').find({ name }).value();

    return studio;
  }
}

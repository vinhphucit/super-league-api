import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { ISeason } from "../models/dao/Season";

import { CreateSeasonRequest } from "../models/dto/request/Season/CreateSeasonRequest";
import { UpdateSeasonRequest } from "../models/dto/request/Season/UpdateSeasonRequest";
import { SeasonRepository } from "../repositories/SeasonRepository";
import { switchNull } from "../utils/StringUtils";

@Service()
export class SeasonService {
  constructor(private readonly repo: SeasonRepository) {}

  public async create(
    Season: CreateSeasonRequest,
    userId?: string
  ): Promise<ISeason> {
    let item: Partial<ISeason> = {
      title: Season.title,
      description: Season.description,
      creatorId: userId,
    };
    return this.repo.create(item);
  }

  async get(
    limit: string,
    start: string,
    sort: string,
    query: string,
    userId?: string
  ): Promise<BaseList<ISeason>> {
    return await this.repo.get(
      limit,
      start,
      sort,
      query
    );
  }

  async getById(id: string): Promise<ISeason> {
    const result = await this.repo.getById(id);
    if (!result) throw new NotFoundException(`Season ${id} doesn't exist`);
    return result;
  }

  async updateById(
    id: string,
    request: UpdateSeasonRequest,    
  ): Promise<ISeason | undefined> {
    const entity = await this.getById(id);

    entity.title = switchNull(request.title, entity.title);
    entity.description = switchNull(request.description, entity.description);

    const updateEntity = await this.repo.updateById(id, entity);

    return updateEntity;
  }

  async deleteById(id: string): Promise<ISeason> {
    await this.getById(id);
    return this.repo.removeById(id);
  }
}

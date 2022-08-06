import { BadRequestException } from "../../base/exceptions/BadRequestException";
import { NotFoundException } from "../../base/exceptions/NotFoundException";
import { Service } from "typedi";
import { BaseList } from "../models/dao/BaseList";
import { IPlayer } from "../models/dao/Player";

import { CreatePlayerRequest } from "../models/dto/request/player/CreatePlayerRequest";
import { UpdatePlayerRequest } from "../models/dto/request/player/UpdatePlayerRequest";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { switchNull } from "../utils/StringUtils";

@Service()
export class PlayerService {
  constructor(private readonly repo: PlayerRepository) {}

  public async create(
    rq: CreatePlayerRequest,
    userId?: string
  ): Promise<IPlayer> {

    const nicknameEntity = await this.getByNickname(rq.nickname);
    if (nicknameEntity != null) {
      throw new BadRequestException(
        `Nickname ${rq.nickname} is not available`
      );
    }
    
    let item: Partial<IPlayer> = {
      firstName: rq.firstName,
      lastName: rq.lastName,
      nickname: rq.nickname,
    };
    return this.repo.create(item);
  }
  async getByNickname(nickname: string): Promise<IPlayer | undefined> {
    const result = await this.repo.get(
      `1`,
      `0`,
      undefined,
      `nickname%eq%${nickname}`
    );
    if (!result || result.totalItems == 0) return undefined;
    return result.items[0];
  }

  async get(
    limit: string,
    start: string,
    sort: string,
    query: string,
    userId?: string
  ): Promise<BaseList<IPlayer>> {
    return await this.repo.get(limit, start, sort, query);
  }

  async getById(id: string): Promise<IPlayer> {
    const result = await this.repo.getById(id);
    if (!result) throw new NotFoundException(`Player ${id} doesn't exist`);
    return result;
  }

  async updateById(
    id: string,
    request: UpdatePlayerRequest
  ): Promise<IPlayer | undefined> {
    const entity = await this.getById(id);

    if (request.nickname != null && entity.nickname !== request.nickname) {
      const nicknameEntity = await this.getByNickname(request.nickname);
      if (nicknameEntity != null && nicknameEntity.id !== entity.id) {
        throw new BadRequestException(
          `Nickname ${request.nickname} is not available`
        );
      }
    }

    entity.firstName = switchNull(request.firstName, entity.firstName);
    entity.lastName = switchNull(request.lastName, entity.lastName);
    entity.nickname = switchNull(request.nickname, entity.nickname);
    const updateEntity = await this.repo.updateById(id, entity);

    return updateEntity;
  }

  async deleteById(id: string): Promise<IPlayer> {
    await this.getById(id);
    return this.repo.removeById(id);
  }
}

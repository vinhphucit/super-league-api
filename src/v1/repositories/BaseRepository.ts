import {isValidObjectId, Model} from "mongoose";
import {BaseList} from "../models/dao/BaseList";
import { QueryParsingUtils } from "../utils/QueryParsingUtils";


export abstract class BaseRepository<T> {
    public readonly _model: Model<T>;

    abstract setModel(): Model<T>;

    getAllowedQueryFields(): string[] {
        return undefined;
    }

    constructor() {
        this._model = this.setModel();
    }

    async create(item: Partial<T>): Promise<T | undefined> {
        return this._model.create(item);
    }

    async createMany(items: Partial<T>[]): Promise<T[]> {
        return this._model.insertMany(items);
    }
    public async getNoLimit(query: string | string[], extraQuery?: string[]): Promise<BaseList<T> | undefined> {
        
        let nQuery = query;
        if (extraQuery) {
            nQuery = QueryParsingUtils.addExtraQuery(query, extraQuery);
        }
        const filter = QueryParsingUtils.parseQuery(nQuery, this.getAllowedQueryFields());

        const result = await Promise.all([this._model.find(filter), this._model.find(filter).countDocuments()]);

        return new BaseList<T>(result[0], 0, undefined, result[1],  undefined, query ? query.toString() : undefined);
    }

    public async get(limit: string | string[], start: string | string[], sort: string | string[], query: string | string[], extraQuery?: string[]): Promise<BaseList<T> | undefined> {
        const limitstart = QueryParsingUtils.parseLimitStart(limit, start);
        const parsedSort = QueryParsingUtils.parseSort(sort);
        let nQuery = query;
        if (extraQuery) {
            nQuery = QueryParsingUtils.addExtraQuery(query, extraQuery);
        }
        const filter = QueryParsingUtils.parseQuery(nQuery, this.getAllowedQueryFields());

        const result = await Promise.all([this._model.find(filter).sort(parsedSort).limit(limitstart[0]).skip(limitstart[1]), this._model.find(filter).countDocuments()]);

        return new BaseList<T>(result[0], limitstart[1], limitstart[0], result[1], sort ? sort.toString() : undefined, query ? query.toString() : undefined);
    }

    public async getById(id: string): Promise<T> {
        if (!isValidObjectId(id)) return undefined;
        return this._model.findById(id);
    }

    public async updateById(id: string, obj: T): Promise<T | undefined> {
        if (!isValidObjectId(id)) return undefined;
        return this._model.findByIdAndUpdate(id, obj, {new: true});
    }

    public async softRemoveById(id: string): Promise<T> {
        if (!isValidObjectId(id)) return undefined;
        const foundObj = await this.getById(id);
        (foundObj as any).isDeleted = true;
        return this._model.findByIdAndUpdate(id, foundObj, {new: true})
    }

    public async softRemoveManyByIds(ids: string[]): Promise<number> {
        const result = await this._model.updateMany({_id: {$in: ids}} as any,  {$set: {isDeleted: true}} as any)
        return result.modifiedCount;
    }

    public async removeById(id: string): Promise<T> {
        if (!isValidObjectId(id)) return undefined;
        return this._model.findByIdAndRemove(id);
    }

    public async removeManyByIds(ids: string[]): Promise<number> {
        const result = await this._model.remove({_id: {$in: ids}});
        return result.deletedCount;
    }
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const mongoose_1 = require("mongoose");
const BaseList_1 = require("../models/dao/BaseList");
const QueryParsingUtils_1 = require("../utils/QueryParsingUtils");
class BaseRepository {
    constructor() {
        this._model = this.setModel();
    }
    getAllowedQueryFields() {
        return undefined;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.create(item);
        });
    }
    createMany(items) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.insertMany(items);
        });
    }
    getNoLimit(query, extraQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            let nQuery = query;
            if (extraQuery) {
                nQuery = QueryParsingUtils_1.QueryParsingUtils.addExtraQuery(query, extraQuery);
            }
            const filter = QueryParsingUtils_1.QueryParsingUtils.parseQuery(nQuery, this.getAllowedQueryFields());
            const result = yield Promise.all([this._model.find(filter), this._model.find(filter).countDocuments()]);
            return new BaseList_1.BaseList(result[0], 0, undefined, result[1], undefined, query ? query.toString() : undefined);
        });
    }
    get(limit, start, sort, query, extraQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const limitstart = QueryParsingUtils_1.QueryParsingUtils.parseLimitStart(limit, start);
            const parsedSort = QueryParsingUtils_1.QueryParsingUtils.parseSort(sort);
            let nQuery = query;
            if (extraQuery) {
                nQuery = QueryParsingUtils_1.QueryParsingUtils.addExtraQuery(query, extraQuery);
            }
            const filter = QueryParsingUtils_1.QueryParsingUtils.parseQuery(nQuery, this.getAllowedQueryFields());
            const result = yield Promise.all([this._model.find(filter).sort(parsedSort).limit(limitstart[0]).skip(limitstart[1]), this._model.find(filter).countDocuments()]);
            return new BaseList_1.BaseList(result[0], limitstart[1], limitstart[0], result[1], sort ? sort.toString() : undefined, query ? query.toString() : undefined);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, mongoose_1.isValidObjectId)(id))
                return undefined;
            return this._model.findById(id);
        });
    }
    updateById(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, mongoose_1.isValidObjectId)(id))
                return undefined;
            return this._model.findByIdAndUpdate(id, obj, { new: true });
        });
    }
    softRemoveById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, mongoose_1.isValidObjectId)(id))
                return undefined;
            const foundObj = yield this.getById(id);
            foundObj.isDeleted = true;
            return this._model.findByIdAndUpdate(id, foundObj, { new: true });
        });
    }
    softRemoveManyByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._model.updateMany({ _id: { $in: ids } }, { $set: { isDeleted: true } });
            return result.modifiedCount;
        });
    }
    removeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, mongoose_1.isValidObjectId)(id))
                return undefined;
            return this._model.findByIdAndRemove(id);
        });
    }
    removeManyByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._model.remove({ _id: { $in: ids } });
            return result.deletedCount;
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map
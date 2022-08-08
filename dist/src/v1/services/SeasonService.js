"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonService = void 0;
const BadRequestException_1 = require("../../base/exceptions/BadRequestException");
const NotFoundException_1 = require("../../base/exceptions/NotFoundException");
const typedi_1 = require("typedi");
const SeasonRepository_1 = require("../repositories/SeasonRepository");
const StringUtils_1 = require("../utils/StringUtils");
const PlayerService_1 = require("./PlayerService");
const SeasonStatus_1 = require("../enums/SeasonStatus");
const MatchService_1 = require("./MatchService");
const event_dispatch_1 = require("event-dispatch");
const Events_1 = __importDefault(require("../subscribers/Events"));
const StandingInitArgument_1 = require("../subscribers/arguments/StandingInitArgument");
const StandingService_1 = require("./StandingService");
let SeasonService = class SeasonService {
    constructor(repo) {
        this.repo = repo;
    }
    create(rq, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = {
                title: rq.title,
                description: rq.description,
                creatorId: userId,
            };
            if (rq.playerIds) {
                const players = yield this.playerService.getByIds(rq.playerIds);
                item.players = players;
            }
            return this.repo.create(item);
        });
    }
    get(limit, start, sort, query, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.get(limit, start, sort, query);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repo.getById(id);
            if (!result)
                throw new NotFoundException_1.NotFoundException(`Season ${id} doesn't exist`);
            return result;
        });
    }
    updateById(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getById(id);
            entity.title = (0, StringUtils_1.switchNull)(request.title, entity.title);
            entity.description = (0, StringUtils_1.switchNull)(request.description, entity.description);
            const updateEntity = yield this.repo.updateById(id, entity);
            return updateEntity;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getById(id);
            return this.repo.removeById(id);
        });
    }
    updatePlayers(id, playerIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getById(id);
            if (entity.status !== SeasonStatus_1.SeasonStatus.NOT_STARTED) {
                throw new BadRequestException_1.BadRequestException(`Can not update guests for this season`);
            }
            const players = yield this.playerService.getByIds(playerIds);
            entity.players = players;
            const updateEntity = yield this.repo.updateById(id, entity);
            return updateEntity;
        });
    }
    changeSeasonStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.getById(id);
            if (status === SeasonStatus_1.SeasonStatus.NOT_STARTED) {
                if (entity.status !== SeasonStatus_1.SeasonStatus.READY)
                    throw new BadRequestException_1.BadRequestException("Can not update status");
                yield this.clearMatches(entity);
                yield this.clearStanding(entity);
            }
            else if (status === SeasonStatus_1.SeasonStatus.READY) {
                if (entity.status !== SeasonStatus_1.SeasonStatus.NOT_STARTED)
                    throw new BadRequestException_1.BadRequestException("Can not update status");
                yield this.generateMatches(entity);
            }
            else if (status === SeasonStatus_1.SeasonStatus.ON_GOING) {
                if (entity.status !== SeasonStatus_1.SeasonStatus.READY)
                    throw new BadRequestException_1.BadRequestException("Can not update status");
            }
            else if (status === SeasonStatus_1.SeasonStatus.ENDED) {
                if (entity.status !== SeasonStatus_1.SeasonStatus.ON_GOING)
                    throw new BadRequestException_1.BadRequestException("Can not update status");
            }
            else if (status === SeasonStatus_1.SeasonStatus.CANCELLED) {
            }
            else {
                throw new BadRequestException_1.BadRequestException("Status is not valid");
            }
            entity.status = status;
            return yield this.repo.updateById(id, entity);
        });
    }
    clearStanding(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.standingService.deleteBySeasonId(entity.id);
        });
    }
    clearMatches(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.matchService.deleteBySeasonId(entity.id);
        });
    }
    generateMatches(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const players = entity.players;
            var matches = [];
            if (players == null || players.length < 2)
                return;
            // create first round matches
            for (var i = 0; i < players.length - 1; i++) {
                for (var j = i + 1; j < players.length; j++) {
                    matches.push({
                        seasonId: entity.id,
                        homePlayer: players[i],
                        awayPlayer: players[j],
                    });
                }
            }
            //create second round matches
            for (var i = matches.length - 1; i >= 0; i--) {
                matches.push({
                    seasonId: entity.id,
                    homePlayer: matches[i].awayPlayer,
                    awayPlayer: matches[i].homePlayer,
                });
            }
            if (matches.length > 0) {
                yield this.matchService.createMany(matches);
            }
            new event_dispatch_1.EventDispatcher().dispatch(Events_1.default.standing.init, new StandingInitArgument_1.StandingInitArgument(entity, players));
        });
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", PlayerService_1.PlayerService)
], SeasonService.prototype, "playerService", void 0);
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", StandingService_1.StandingService)
], SeasonService.prototype, "standingService", void 0);
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", MatchService_1.MatchService)
], SeasonService.prototype, "matchService", void 0);
SeasonService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [SeasonRepository_1.SeasonRepository])
], SeasonService);
exports.SeasonService = SeasonService;
//# sourceMappingURL=SeasonService.js.map
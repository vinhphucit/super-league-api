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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeasonRequest = void 0;
const class_validator_1 = require("class-validator");
const IsNotEmptyString_1 = require("../../../../utils/validation/IsNotEmptyString");
class CreateSeasonRequest {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    (0, IsNotEmptyString_1.IsNotEmptyString)(),
    __metadata("design:type", String)
], CreateSeasonRequest.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 500),
    (0, IsNotEmptyString_1.IsNotEmptyString)(),
    __metadata("design:type", String)
], CreateSeasonRequest.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateSeasonRequest.prototype, "playerIds", void 0);
exports.CreateSeasonRequest = CreateSeasonRequest;
//# sourceMappingURL=CreateSeasonRequest.js.map
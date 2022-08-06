"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParsingUtils = void 0;
const moment_1 = __importDefault(require("moment"));
const Logger_1 = require("../../base/utils/Logger");
const StringUtils_1 = require("./StringUtils");
class QueryParsingUtils {
    static parseLimitStart(limit, start) {
        if (limit && Array.isArray(limit)) {
            limit = limit[limit.length - 1];
        }
        if (start && Array.isArray(start)) {
            start = start[start.length - 1];
        }
        let nLimit = QueryParsingUtils.LIMIT;
        let nStart = 0;
        if (limit && !isNaN(Number(limit)) && +limit <= QueryParsingUtils.LIMIT) {
            nLimit = +limit;
        }
        if (start && !isNaN(Number(start))) {
            nStart = +start;
        }
        return [nLimit, nStart];
    }
    static parseSort(pRawSort) {
        if (pRawSort) {
            let rawSort = "";
            let sortingMap = new Map();
            if (Array.isArray(pRawSort)) {
                rawSort = pRawSort.join(",");
            }
            else {
                rawSort = pRawSort;
            }
            let sortItems = rawSort.split(",");
            for (let sortItem of sortItems) {
                let order;
                if (sortItem.charAt(0) === "+") {
                    order = 1;
                }
                else if (sortItem.charAt(0) === "-") {
                    order = -1;
                }
                else {
                    continue;
                }
                sortingMap.set(this.standardizefield(sortItem.substring(1)), order);
            }
            return Array.from(sortingMap);
        }
        return [];
    }
    static parseQuery(pQueryString, allowFields) {
        if (!pQueryString) {
            return {};
        }
        let queryString = "";
        if (Array.isArray(pQueryString)) {
            queryString = pQueryString.join(",");
        }
        else {
            queryString = pQueryString;
        }
        try {
            let queries = queryString.split(",");
            let mongoQuery = {};
            for (let iQuery of queries) {
                let iQueryParts = iQuery.split("%");
                if (iQueryParts.length != 3) {
                    continue;
                }
                //field
                let iQueryField = iQueryParts[0];
                if (!iQueryField) {
                    continue;
                }
                iQueryField = iQueryField.trim();
                if (iQueryField.length <= 0) {
                    continue;
                }
                iQueryField = this.standardizefield(iQueryField);
                if (allowFields) {
                    if (allowFields.includes(iQueryField)) {
                        Logger_1.Logger.info(`Field ${iQueryField} is not allow in query`);
                        continue;
                    }
                }
                //operator
                let iQueryOperator = iQueryParts[1];
                if (!iQueryOperator) {
                    continue;
                }
                //actual comparations
                let iQueryValue = iQueryParts[2];
                //only accept string or number
                if (typeof iQueryValue !== "string" &&
                    typeof iQueryValue !== "number") {
                    continue;
                }
                if (iQueryOperator === "like") {
                    let iRegex = new RegExp(iQueryValue, "i");
                    mongoQuery[iQueryField] = {
                        $regex: iRegex,
                    };
                }
                else if (iQueryOperator === "in") {
                    let iInItems = iQueryValue.split("|");
                    mongoQuery[iQueryField] = {
                        $in: iInItems,
                    };
                }
                else if (iQueryOperator === "nin") {
                    let iInItems = iQueryValue.split("|");
                    mongoQuery[iQueryField] = {
                        $nin: iInItems,
                    };
                }
                else if (iQueryOperator === "gt") {
                    mongoQuery[iQueryField] = {
                        $gt: iQueryValue,
                    };
                }
                else if (iQueryOperator === "gte") {
                    mongoQuery[iQueryField] = {
                        $gte: iQueryValue,
                    };
                }
                else if (iQueryOperator === "lt") {
                    mongoQuery[iQueryField] = {
                        $lt: iQueryValue,
                    };
                }
                else if (iQueryOperator === "lte") {
                    mongoQuery[iQueryField] = {
                        $lte: iQueryValue,
                    };
                }
                else if (iQueryOperator === "ne") {
                    mongoQuery[iQueryField] = {
                        $ne: iQueryValue,
                    };
                }
                else if (iQueryOperator === "eq") {
                    mongoQuery[iQueryField] = iQueryValue;
                }
                else if (iQueryOperator === "gtd" ||
                    iQueryOperator === "gted" ||
                    iQueryOperator === "ltd" ||
                    iQueryOperator === "lted") {
                    let iQueryValueMoment = (0, moment_1.default)(iQueryValue, StringUtils_1.DATETIME_FORMAT_NO_TZ);
                    let iQueryValueDate = iQueryValueMoment
                        ? iQueryValueMoment.toDate()
                        : null;
                    if (iQueryValueDate) {
                        let iOperator = null;
                        if (iQueryOperator === "gtd") {
                            iOperator = "$gt";
                        }
                        else if (iQueryOperator === "gted") {
                            iOperator = "$gte";
                        }
                        else if (iQueryOperator === "ltd") {
                            iOperator = "$lt";
                        }
                        else if (iQueryOperator === "lted") {
                            iOperator = "$lte";
                        }
                        if (!mongoQuery[iQueryField]) {
                            mongoQuery[iQueryField] = {};
                        }
                        mongoQuery[iQueryField][iOperator] = iQueryValueDate;
                    }
                }
            }
            return mongoQuery;
        }
        catch (unexpectedErr) {
            Logger_1.Logger.info(`Can't parse query ${queryString}, error detail: ${unexpectedErr}`);
            return {};
        }
    }
    static addExtraQuery(query, extraQuery) {
        let nQuery = [];
        if (!query) {
            nQuery = [];
        }
        if (!extraQuery)
            return nQuery;
        if (!Array.isArray(query)) {
            nQuery = [query];
        }
        for (const extra of extraQuery) {
            nQuery.push(extra);
        }
        return nQuery;
    }
    static standardizefield(field) {
        if (field === `id`) {
            return `_id`;
        }
        return field;
    }
}
exports.QueryParsingUtils = QueryParsingUtils;
QueryParsingUtils.LIMIT = 100;
//# sourceMappingURL=QueryParsingUtils.js.map
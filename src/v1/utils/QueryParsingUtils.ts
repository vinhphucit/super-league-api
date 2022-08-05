import moment from "moment";
import { Logger } from "../../base/utils/Logger";
import { DATETIME_FORMAT_NO_TZ } from "./StringUtils";


export class QueryParsingUtils {
  static LIMIT: number = 100;

  public static parseLimitStart(
    limit: string | string[],
    start: string | string[]
  ): [number, number] {
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

  public static parseSort(
    pRawSort: string | string[]
  ): [string, number][] | undefined {
    if (pRawSort) {
      let rawSort = "";
      let sortingMap = new Map();
      if (Array.isArray(pRawSort)) {
        rawSort = pRawSort.join(",");
      } else {
        rawSort = pRawSort;
      }

      let sortItems = rawSort.split(",");
      for (let sortItem of sortItems) {
        let order;
        if (sortItem.charAt(0) === "+") {
          order = 1;
        } else if (sortItem.charAt(0) === "-") {
          order = -1;
        } else {
          continue;
        }

        sortingMap.set(this.standardizefield(sortItem.substring(1)), order);
      }
      return Array.from(sortingMap);
    }
    return [];
  }

  public static parseQuery(
    pQueryString: string | string[],
    allowFields?: string[]
  ) {
    if (!pQueryString) {
      return {};
    }
    let queryString = "";
    if (Array.isArray(pQueryString)) {
      queryString = pQueryString.join(",");
    } else {
      queryString = pQueryString;
    }

    try {
      let queries = queryString.split(",");
      let mongoQuery: any = {};

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
            Logger.info(`Field ${iQueryField} is not allow in query`);
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
        if (
          typeof iQueryValue !== "string" &&
          typeof iQueryValue !== "number"
        ) {
          continue;
        }

        if (iQueryOperator === "like") {
          let iRegex = new RegExp(iQueryValue, "i");

          mongoQuery[iQueryField] = {
            $regex: iRegex,
          };
        } else if (iQueryOperator === "in") {
          let iInItems = iQueryValue.split("|");

          mongoQuery[iQueryField] = {
            $in: iInItems,
          };
        } else if (iQueryOperator === "nin") {
          let iInItems = iQueryValue.split("|");

          mongoQuery[iQueryField] = {
            $nin: iInItems,
          };
        } else if (iQueryOperator === "gt") {
          mongoQuery[iQueryField] = {
            $gt: iQueryValue,
          };
        } else if (iQueryOperator === "gte") {
          mongoQuery[iQueryField] = {
            $gte: iQueryValue,
          };
        } else if (iQueryOperator === "lt") {
          mongoQuery[iQueryField] = {
            $lt: iQueryValue,
          };
        } else if (iQueryOperator === "lte") {
          mongoQuery[iQueryField] = {
            $lte: iQueryValue,
          };
        } else if (iQueryOperator === "ne") {
          mongoQuery[iQueryField] = {
            $ne: iQueryValue,
          };
        } else if (iQueryOperator === "eq") {
          mongoQuery[iQueryField] = iQueryValue;
        } else if (
          iQueryOperator === "gtd" ||
          iQueryOperator === "gted" ||
          iQueryOperator === "ltd" ||
          iQueryOperator === "lted"
        ) {
          let iQueryValueMoment = moment(iQueryValue, DATETIME_FORMAT_NO_TZ);
          let iQueryValueDate = iQueryValueMoment
            ? iQueryValueMoment.toDate()
            : null;

          if (iQueryValueDate) {
            let iOperator = null;
            if (iQueryOperator === "gtd") {
              iOperator = "$gt";
            } else if (iQueryOperator === "gted") {
              iOperator = "$gte";
            } else if (iQueryOperator === "ltd") {
              iOperator = "$lt";
            } else if (iQueryOperator === "lted") {
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
    } catch (unexpectedErr) {
      Logger.info(
        `Can't parse query ${queryString}, error detail: ${unexpectedErr}`
      );
      return {};
    }
  }

  public static addExtraQuery(
    query: string | string[],
    extraQuery: string[]
  ): string | string[] {
    let nQuery: string | string[] = [];
    if (!query) {
      nQuery = [];
    }

    if (!extraQuery) return nQuery;
    if (!Array.isArray(query)) {
      nQuery = [query];
    }
    for (const extra of extraQuery) {
      nQuery.push(extra);
    }
    return nQuery;
  }

  private static standardizefield(field: string) {
    if (field === `id`) {
      return `_id`;
    }
    return field;
  }
}


export class BaseListResponse<T> {
    public items: T[];
    public start: number;
    public limit: number;
    public totalItems: number;
    public query: string;
    public sort: string;


    constructor(items: T[], start: number, limit: number, totalItems: number, sort: string, query: string) {
        this.items = items;
        this.start = start;
        this.limit = limit;
        this.totalItems = totalItems;
        this.query = query;
        this.sort = sort;
    }
}

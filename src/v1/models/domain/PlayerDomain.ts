import { IPlayer } from "../dao/Player";

export class PlayerDomain {
    id: string;
    firstName: string;
    lastName: string;
    nickname: string;    
    createdAt: Date;
    updatedAt: Date;
    constructor() ;
    constructor(result: IPlayer);
    constructor(result?: IPlayer) {
        if (!result) return;
        this.id = result._id;         
        this.firstName = result.firstName;
        this.lastName = result.lastName;
        this.nickname = result.nickname;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    }

}

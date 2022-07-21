import { AuthToken } from "@la-forge/models";

export class Logout {
    static readonly type = '[Auth] Logout';
}

export class SetToken {
    static readonly type = '[Auth] New Token Recieved'
    constructor(public payload: AuthToken) { }
}
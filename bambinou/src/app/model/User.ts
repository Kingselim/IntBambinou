
import { RoleType } from "./RoleType"


export class User {
    id ! : number
    name !: string
    age! : number
    phone! : string
    country! : string
    email ! : string
    status! : number
    password! : string
    roleTypes!  : RoleType[];
    image! : string
    }

import { Conversation } from "./Conversation"
import { RoleType } from "./RoleType"
import { User } from "./User"
export class Message {
    idMessage ! : number
    message !: string
    time! : Date
    sender! : User
    conversation! : Conversation
    }
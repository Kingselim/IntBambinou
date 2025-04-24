import { User } from "./User";
import { Message } from "./Message";
export class Conversation {
    idConversation! : number
    creationDate! : Date
    users!  : User[];
    messages! : Message[];
    }
import { User } from "./user";

export interface NewsItem {
    id : number;
    title : string;
    description : string;
    image : string;
    content: string;
    author: User;
}

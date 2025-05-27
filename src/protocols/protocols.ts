export type User = {
    id:number;
    name:string,
    email:string,
    password:string
}

export type InsertUser = Omit<User, "id">
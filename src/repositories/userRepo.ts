import { InsertUser, User } from "../protocols/protocols";
import db from "../database/database";


export async function findEmail(email: string){
    const result = await db.query<User>(`SELECT * FROM users WHERE email = $1`,[email]);
    return result.rows[0];
}

export async function signUpRepo(userData: InsertUser){
    const {name, email, password} = userData;
    const result = await db.query<User>(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,[name, email, password]);
    return result.rows[0];
}
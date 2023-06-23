import "reflect-metadata"
import { DataSource } from "typeorm"
import { Listing } from './entity/Listing.js';
import { env } from "process";



const db = new DataSource({
    type: "postgres" ,
    host: env.DB_HOST || "",
    port: Number(env.DB_PORT) || 5432,
    username: env.DB_USER || "root",
    password: env.DB_PASSWORD || "admin",
    database: env.DB_DATABASE || "test",
    entities: [Listing],
    synchronize: true,
    logging: false,
})



export default db;
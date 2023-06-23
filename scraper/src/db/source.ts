import "reflect-metadata"
import { DataSource } from "typeorm"
import { Listing } from './entity/Listing.js';
import config from './../config.js';


const db = new DataSource({
    type: "postgres" ,
    host: String(config.DB_HOST) || "",
    port: Number(config.DB_PORT) || 5432,
    username: String(config.DB_USER) || "root",
    password: String(config.DB_PASSWORD) || "admin",
    database: String(config.DB_DATABASE) || "test",
    entities: [Listing],
    synchronize: true,
    logging: false,
})

export default db;
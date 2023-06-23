import getListings from "./scrape.js"
import { envSetup } from "./config.js";
// import db from './db/source.js';

// load the .env variables to the config object
envSetup()

// initialize connection with the database, register all entities, and "synchronize" database schema
// db.initialize()
//     .then(async () => {
//         // indicate to the nextjs app, that db is ready
        
        
//         // scrape and save
//         if(false)
//             await getListings();

//         // indicate to the nextjs app, that scraping is done

//     })
//     .catch((error) => console.log(error))



await getListings();
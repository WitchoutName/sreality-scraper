// import getListings from "./scrape.js"
import db from './db/source.js';
import { Status, setScraperStatus } from './status.js';

setScraperStatus(Status.Started);

// initialize connection with the database, register all entities, and "synchronize" database schema
db.initialize().then(async () => {
    // indicate to the nextjs app, that db is ready
    setScraperStatus(Status.DatabaseReady);
    console.log("db initalized")
    // scrape and save
    // if(false)
    //     await getListings();

    // indicate to the nextjs app, that scraping is done
    setScraperStatus(Status.ScrapingDone);
})
.catch((error) => console.log(error))



// await getListings();
import { postStatus } from './database.js';
import getListings from './scrape.js';


const listings = await getListings();

console.log(`Scraped ${listings.length} listings.`)

postStatus("done");

import axios from 'axios';

// send a post request to create bunch of Listings
export async function postListings(listings: Array<object>){
    try {
        await axios.post(`http://app:8080/api/listings`, listings);        
    } catch (error) {
        console.error(error);
    }
}

// send a post request to chenge the status of the scraper in the db
export async function postStatus(status: string){
    try {
        await axios.post(`http://app:8080/api/scraping-status`, status);    
    } catch (error) {
        console.error(error);
    }
}
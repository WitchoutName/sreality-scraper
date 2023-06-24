import axios from 'axios';


export async function postListings(listings: Array<object>){
    try {
        await axios.post(`http://app:8080/api/listings`, listings);        
    } catch (error) {
        console.error(error);
    }
}


export async function postStatus(status: string){
    try {
        await axios.post(`http://app:8080/api/scraping-status`, status);    
    } catch (error) {
        console.error(error);
    }
}
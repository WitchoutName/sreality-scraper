import puppeteer, { Page } from "puppeteer";
import { env } from 'process';
import { postListings } from "./database.js";

// scrape a page of listings and save it to the webserver
const getPageListings = async (page:Page): Promise<Array<object>> => {
  const listings = [];

  // wait for the listings to load
  await page.waitForSelector('.property');
  const listingsHandles = await page.$$(".property");

  // parse all listings
  for (const handle of listingsHandles) {
    const listing = {
      title: "Null",
      imgUrl: "null"
    }

    try { // fetch title
      listing.title = await page.evaluate(
        (el) => el.querySelector(".title").textContent.trim(), 
        handle
      );
    } catch (error) {
      console.error(error);
    }

    try { // fetch image url
      listing.imgUrl = await page.evaluate(
        (el) => el.querySelector("img").getAttribute("src"),
        handle
      );
    } catch (error) {
      console.error(error);
    }

    listings.push(listing);
  }

  return listings;
}


// scrape the srealty.cz website 
export default async function getListings() {
  let listings = [];
  let timeout = false;
  const target_number = Number(env.SC_TARGET_NUMBER);

  // prepare the scraper
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox']
  });
      
    
  const page = await browser.newPage();
    
  // wilhe the nuber of scraped listings if smaller than the desired amount and the page didn't time out
  for(let i = 1; listings.length < target_number && !timeout; i++){ 
    try{
      await page.goto(`https://www.sreality.cz/en/search/for-sale/apartments?page=${i}`, {
        waitUntil: "domcontentloaded",
      });
      
      const newListings = await getPageListings(page);
      postListings(newListings);
      

      listings = listings.concat(newListings);
    } catch(e){
      timeout = true;
    }
  }
  await browser.close();
  return listings;
}
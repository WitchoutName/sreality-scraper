import puppeteer, { Page } from "puppeteer";
import { env } from 'process';

const getPageListings = async (page:Page): Promise<Array<object>> => {
  const listings = [];

  // wait for the listings to load
  await page.waitForSelector('.property');
  const listingsHandles = await page.$$(".property");

  // parse all listings
  for (const handle of listingsHandles) {
    const listing = {
      title: "Null",
      img: "null"
    }

    try {
      listing.title = await page.evaluate(
        (el) => el.querySelector(".title").textContent.trim(), 
        handle
      );
    } catch (error) {
      console.error(error);
    }

    try {
      listing.img = await page.evaluate(
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

export default async function getListings() {
  let listings = [];
  let timeout = false;
  const target_number = Number(env.SC_TARGET_NUMBER);

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox']
    // headless: false,
    // defaultViewport: null,
  });
      
    
  const page = await browser.newPage();
    
  for(let i = 1; listings.length < target_number && !timeout; i++){
    try{
      await page.goto(`https://www.sreality.cz/en/search/for-sale/apartments?page=${i}`, {
        waitUntil: "domcontentloaded",
      });
      const newListings = await getPageListings(page);
      // console.log(newListings);
      listings = listings.concat(newListings);
    } catch(e){
      timeout = true;
    }
  }
  await browser.close();
  return listings;
}
import puppeteer, { Page } from "puppeteer";
import config from "./config.js";

const getPageListings = async (page:Page): Promise<Array<Object>> => {
  const listings = [];

  // wait for the listings to load
  await page.waitForSelector('.property');
  const listingsHandles = await page.$$(".property");

  // parse all listings
  for (const handle of listingsHandles) {
    let listing = {
      title: "Null",
      img: "null"
    }

    try {
      listing.title = await page.evaluate(
        (el) => el.querySelector(".title").textContent.trim(),
        handle
      );
    } catch (error) {}

    try {
      listing.img = await page.evaluate(
        (el) => el.querySelector("img").getAttribute("src"),
        handle
      );
    } catch (error) {}

    listings.push(listing);
  }

  return listings;
}

export default async function getListings() {
  let listings = [];
  let timeout = false;
  const target_number = Number(config.SC_TARGET_NUMBER);

  const browser = await puppeteer.launch({
    headless: false,
      defaultViewport: null,
  });
      
    
  const page = await browser.newPage();
    
  for(let i = 1; listings.length < target_number && !timeout; i++){
    try{
      await page.goto(`https://www.sreality.cz/en/search/for-sale/apartments?page=${i}`, {
        waitUntil: "domcontentloaded",
      });
      const newListings = await getPageListings(page);
      listings = listings.concat(newListings);
    } catch(e){
      timeout = true;
    }
  }
  await browser.close();
  return listings;
}
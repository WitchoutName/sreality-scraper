import { writeFileSync } from "fs";


export default async function setScraperStatus(status:string) {
    writeFileSync("./scrapingStatus.txt", status);
}

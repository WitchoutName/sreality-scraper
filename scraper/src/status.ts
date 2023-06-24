import { writeFileSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export enum Status{
    Started,
    ScrapingDone
}

export const scraperRootDir = path.resolve(dirname(fileURLToPath(import.meta.url)), '../../');

export function setScraperStatus(status:Status): void {
    writeFileSync(scraperRootDir + "/status/scrapingStatus",  status.toString());
}

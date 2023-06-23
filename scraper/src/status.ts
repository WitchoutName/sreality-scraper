import { writeFileSync } from "fs";
import path from "path";

export enum Status{
    Started,
    DatabaseReady,
    ScrapingDone
}

// export const projectRootDir = path.resolve(dirname(fileURLToPath(import.meta.url)), '../../');

export async function setScraperStatus(status:Status): Promise<void> {
    await writeFileSync(path.resolve("../status/scrapingStatus.txt"),  status.toString());
}

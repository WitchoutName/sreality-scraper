import { ScrapingStatus } from "@prisma/client";
import prisma from "./client";


// return the status of the scraper from the db entry
export async function getStatus(): Promise<string> {
    const data = await prisma.scrapingStatus.findFirst() || await prisma.scrapingStatus.create({data: {
        status: "notDone"
    }});
    return data.status;
}

// alter the status of the scraper in the db
export async function setStatus(newStatus: string): Promise<void> {
    const data = await prisma.scrapingStatus.findFirst() || await prisma.scrapingStatus.create({data: {
        status: newStatus
    }});
    
    await prisma.scrapingStatus.update({
        where: {
          id: data.id,
        },
        data: {
          status: newStatus,
        },
      });
}
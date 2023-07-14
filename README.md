# Sreality Scraper
This project scrapes the first 500 items (title, image url) from sreality.cz (flats, sell) and saves them in a Postgresql database. It also implements a simple web app using Next.js and React to show these 500 items on a nice page with pagination and custom design.

## Disclaimer
This project is not intended to be production-ready or follow best practices. It is a simple demonstration of scraping and web development skills. For speed of development and ease of deployment, some of the shortcuts taken include:

- Committing the .env file in the repository
- Running dev servers in docker containers
- Not optimizing performance or security
- Not writing tests or documentation
- Not handling errors or edge cases

Please do not use this project as a reference for production code or real-world scenarios.

## How to run
The project uses docker-compose to run two containers: one for the scraper and one for the web app. To run the project, simply clone this repository and run the following command in the root directory:

```bash
docker-compose up
```
This will start the scraper and the web app. You can access the web app at http://127.0.0.1:8080.
## How it works
The project works in the following manner:

1. The scraper container runs a Node.js script that uses Puppeteer to scrape the listings from sreality.cz. It initializes the database connection and create the listings table if it does not exist.
2. The scraper progressively saves the scraped listings in the database using the Next.js app API. It also updates a field on a singleton record in the database to indicate the progress of the scraping.
3. Once the scraping is done, the scraper changes the field on the singleton record to indicate that the scraping is complete and exits.
4. The web app container runs a Next.js app that uses React for the frontend and Prisma as an ORM to access the database. It also uses Tailwind CSS for styling.
5. The web app displays the progress of the scraping on the index page using. It fetches the singleton record from the database and shows a progress bar based on the number of scraped listings.
6. Once all the data is in the database, the web app switches to display the gathered listings in a gallery with custom pagination.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

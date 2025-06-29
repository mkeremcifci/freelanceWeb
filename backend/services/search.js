import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as cheerio from 'cheerio';

import { BadRequestError } from '../models/Error.js';


puppeteer.use(StealthPlugin());

export default class Search{
    static async search(keyword){
        if (!keyword || keyword == ''){
            throw new BadRequestError("Geçersiz keyword yollandı");
        }
        
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
            defaultViewport: null
        });
        const page = await browser.newPage();
    
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' + 
            '(KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36'
        );
        await page.goto('https://www.tr.freelancer.com/search/projects?projectLanguages=en', {
            waitUntil: 'networkidle2'
        });
        
        const searchInput = 'input[name="search_keyword"]';
        const searchButton = '#search-submit';

        await page.waitForSelector(searchInput, {timeout: 5000});
        
        await page.evaluate((selector) => {
            const input = document.querySelector(selector);
            if (input) {
                input.value = '';
                input.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }, searchInput);

        await page.type(searchInput, keyword);

        await page.waitForSelector(searchButton, {timeout:5000});
        await page.click(searchButton);

        await page.waitForNavigation({timeout:5000});

        const content = await page.content();

        const $ = cheerio.load(content);

        const result = [];
        $('.Grid-col--desktopSmall-9 .JobSearchCard-item').each((i, el) => {
            const element = $(el);
            const job = {
                name: element.find('.JobSearchCard-primary-heading-link').text().trim() || null,
                remainingDays: element.find('.JobSearchCard-primary-heading-days').text().trim() || null,
                description: element.find('.JobSearchCard-primary-description').text().trim() || null,
            };
            result.push(job);
        });
        await page.close();
        await browser.close();

        return result;

    }
}
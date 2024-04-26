import { Builder, Browser, By, Key, until, WebDriver } from 'selenium-webdriver';
import 'selenium-webdriver/chrome';

function yahooScraper(ticker: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
    let driver: WebDriver;
    
    try {
        driver = await new Builder().forBrowser('chrome').build();

        await driver.get(`https://finance.yahoo.com/quote/${ticker}?.tsrc=fin-srch`);

        //locate by xpath. So far works with different tickers
        const stockName = await driver.findElement(By.xpath('//*[@id="nimbus-app"]/section/section/section/article/section[1]/div[1]/div/section/h1'));
        const currentPrice = await driver.findElement(By.xpath('//*[@id="nimbus-app"]/section/section/section/article/section[1]/div[2]/div[1]/section/div/section[1]/div[1]/fin-streamer[1]/span'))

        const text = await stockName.getText();
        const price = await currentPrice.getText();
        console.log('Stock name:', text);
        console.log('Current price:', price);
        resolve();
    } catch (error) {
        reject(error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }

    })
}

yahooScraper('AAPL').catch(console.error);  
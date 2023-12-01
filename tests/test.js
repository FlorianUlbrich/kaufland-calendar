let {By, Key, Builder, WebDriver, WebElement, Actions} = require("selenium-webdriver");
const { elementIsDisabled } = require("selenium-webdriver/lib/until");
require("chromedriver");
require("geckodriver");

// set personal information
const firstName = "Stephan";
const lastName = "lastName";
const street = "street";
const houseNumber = "0";
const zip = "12345";
const city = "city";
const country = "Deutschland";
const email = "max@gmail.com";
const card = "0000000000000000"; // 16 digits

// there is probably a more elegant way to get this format
let currentDate = new Date();
let cDay = currentDate.getDate();
if(cDay < 10){
    cDay = "0" + cDay;
}
xPathToCalendar = "//body[@data-t-id='1']";
todayXPath = "//a[@data-id='" + cDay + "-12-2023']";
console.log(todayXPath);

// asynchronous functions wait for promise to be delivered
async function fillOutForm(){

    let driver = await new Builder().forBrowser("chrome").build();
    const kauflandCalendar = "https://filiale.kaufland.de/highlights/adventskalender.html";
    await driver.get(kauflandCalendar);
    await driver.sleep(500);

    // Find the button using a suitable locator, for example, by ID
    let button = driver.findElement(By.id("onetrust-reject-all-handler"));

    // Check if the button is displayed
    if (await button.isDisplayed()) {
        // Click the button
        await driver.executeScript("arguments[0].click();", button);
        console.log("Button clicked!");
    } else {
        console.log("Button not found or not displayed");
    }

    // find todays door with xPath selection and click on it
    await driver.findElement(By.xpath(todayXPath)).click();
    await driver.sleep(500);
    // get form
    await driver.executeScript("arguments[0].click();", driver.findElement(By.xpath("//input[@id='gender-male']")));
    await driver.sleep(1500);
    // radio button for gender
    await driver.findElement(By.xpath("//input[@id='firstName']")).sendKeys(firstName);
    await driver.findElement(By.xpath("//input[@name='lastName']")).sendKeys(lastName);
    await driver.findElement(By.xpath("//input[@name='street']")).sendKeys(street);
    await driver.findElement(By.xpath("//input[@name='streetNumber']")).sendKeys(houseNumber);
    await driver.findElement(By.xpath("//input[@name='zipCode']")).sendKeys(zip);
    await driver.findElement(By.xpath("//input[@name='city']")).sendKeys(city);
    await driver.findElement(By.xpath("//input[@name='participantEmail']")).sendKeys(email);
    await driver.findElement(By.xpath("//input[@name='kcard']")).sendKeys(card);
    await driver.sleep(1500);
    await driver.executeScript("arguments[0].click();", await driver.findElement(By.xpath("//input[@name='participation']")));
    await driver.executeScript("arguments[0].click();", await driver.findElement(By.xpath("//input[@name='kcardCheckbox']")));
    
    // click checkbox I'm not a robot
    await driver.executeScript("arguments[0].click();", await driver.findElement(By.xpath("//span[@id='recaptcha-anchor']")));
}

fillOutForm();

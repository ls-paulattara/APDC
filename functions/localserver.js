const express = require('express')
const app = express()
const port = 44000
const puppeteer = require('puppeteer');
var cors = require('cors')
const {getLSAPICredentials, getCalendlyCredentials} = require("./SecretManager/index");


app.use(cors())

app.get('/', async (req, res) => {

  // let cred = await getLSAPICredentials()
  let cred = await getCalendlyCredentials()
  console.log(cred);
  res.send("cheese")
})

app.post('/html-to-pdf', async (req, res) => {
    console.log(req.body)

    // const browser = await puppeteer.launch();
    const browser = //wait puppeteer.launch({headless: false , slowMo: 100, rgs: ['--start-fullscreen', '--window-size=1920,1080'], executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe' });
    await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] 
  });
    const page = await browser.newPage();
    await page.setContent(req.body.html);
    const buffer = await page.pdf({ format: "A4" });
    await browser.close();
    res.end(buffer);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const puppeteer = require('puppeteer');

(async () => {

    try {

        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome',
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });

        const page = await browser.newPage();

        await page.setViewport({
            width: 1400,
            height: 1000
        });

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36'
        );

        console.log('Opening page...');

        await page.goto(
            'https://mycutebaby.in/contest/participant/69f39325be245',
            {
                waitUntil: 'networkidle2',
                timeout: 0
            }
        );

        // Wait for full page render
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Entering name...');

        // Fill input
        await page.evaluate(() => {

            const input = document.querySelector('input');

            if (input) {

                input.value = 'Kishan';

                input.dispatchEvent(
                    new Event('input', { bubbles: true })
                );

                input.dispatchEvent(
                    new Event('change', { bubbles: true })
                );

            }

        });

        // Wait after typing
        await new Promise(resolve => setTimeout(resolve, 3000));

        console.log('Searching TAP TO VOTE button...');

        const clicked = await page.evaluate(() => {

            const allElements = Array.from(
                document.querySelectorAll('*')
            );

            const voteButton = allElements.find(el => {

                const text = el.innerText
                    ?.trim()
                    ?.toLowerCase();

                return (
                    text === 'tap to vote !' ||
                    text === 'tap to vote!'
                );

            });

            if (voteButton) {

                voteButton.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                voteButton.dispatchEvent(
                    new MouseEvent('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    })
                );

                return true;
            }

            return false;

        });

        console.log('Vote clicked:', clicked);

        // Wait after click
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Print page text
        const body = await page.evaluate(() => {
            return document.body.innerText;
        });

        console.log(body);

        await browser.close();

        console.log('Browser closed');

    } catch (err) {

        console.log('ERROR:', err);

    }

})();
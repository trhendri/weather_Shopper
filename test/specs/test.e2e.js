const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");
const helper = require("../pageobjects/helper.js");

describe("My Login application", () => {
    it("should login with valid credentials", async () => {
        await LoginPage.open();

        await LoginPage.login("tomsmith", "SuperSecretPassword!");
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
    });
});

describe("Assignment 1", () => {
    beforeEach(async () => {
        await browser.url("/");
    });

    //Temp is randomized on page open

    it("Shop for moisturizers if the weather is below 19 degrees. Shop for suncreens if the weather is above 34 degrees", async () => {
        const moisturizersBtn = await $(helper.moisturizersBtn);
        const sunscreensBtn = await $(helper.sunscreensBtn);
        const origTemp = await $(helper.temp).getText();
        const editTemp = await origTemp.slice(0, -2);
        console.log(editTemp);

        if (editTemp < 19) {
            await moisturizersBtn.click();
            await expect(browser).toHaveUrl("https://weathershopper.pythonanywhere.com/moisturizer");
        } else if (editTemp > 34) {
            await sunscreensBtn.click();
            await expect(browser).toHaveUrl("https://weathershopper.pythonanywhere.com/sunscreen");
        } else {
            console.log("Perfect Weather");
        }

        await browser.pause(2000);
        await expect(browser).toHaveUrl;
    });
});

describe.only("Assignment2: Add 2 moisturizers to cart", () => {
    beforeEach(async () => {
        await browser.url("/moisturizer");
    });
    it.only("Add to cart: Least Expensive containing Aloe", async () => {
        const moisturizers = await $$(helper.moisturizers);
        const aloeProdPrices = [];

        //Loop through products
        for (const prod of moisturizers) {
            const prodText = await prod.getText();

            //Find productsText that contains 'Aloe'
            if (prodText.includes("Aloe")) {
                //For prods that contain aloe, define conts for objects, objects created to better manip elements like price
                const name = await prod.$(helper.prodNames).getText(); //grab  prodname element of product
                const price = await prod.$$(helper.prodPrices)[1].getText(); //grab price
                const addButton = await prod.$(helper.prodBtns).getHTML(); //grab button

                //Heres the object
                const productsDetails = {
                    name: name, // for productsDetail.name - it pulls the const name above and selectors
                    price: price, //etc
                    addButton: addButton, //etc
                };

                console.log(productsDetails);

                //I want to grab the price object and keep the last 3 numbers since theres also letters in this

                const isolatePrice = await productsDetails.price.slice(-3); // grabs last three numbers of price
                const numPrice = parseInt(isolatePrice);

                console.log(numPrice);
                aloeProdPrices.push(numPrice);

                console.log(aloeProdPrices);
                const minPrice = Math.min(...aloeProdPrices); //spread operator // grabbed min price
                console.log(minPrice);
                ////////HOW TO GRAB the object props back to click btn. also may need to add the price slice into the productsDetails.price thing and reposition some statements
            }
        }

        //Need to make an array or object. using Get?
    });

    it("Add to cart: Least Expensive containing Almond", async () => {});
});

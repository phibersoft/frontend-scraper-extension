// You can manipulate the DOM of the page you are on

import { IMessage } from "./types";
import { imageUrlEditor } from "./utils";

console.log(`Content script loaded.`);

chrome.runtime.onMessage.addListener(
  (message: IMessage, sender, sendResponse) => {
    console.log(`Received message: ${message.type}`);
    console.log(message);

    switch (message.type) {
      case "scrape":
        console.log(`Scraping page...`);
        const allElements = document.querySelectorAll("*");

        const differentFontsWithWeights = new Set<string>(); // Store fonts like "name:weight"
        const images = new Set<string>(); // Store image URLs
        const colors = new Set<string>(); // Store colors

        for (let i = 0; i < allElements.length; i++) {
          const element = allElements[i];

          // Scrape Font-family
          const style = getComputedStyle(element);
          const { fontFamily, fontWeight } = style;

          // font-family is a comma separated list of fonts, just take the first one
          const fontName = fontFamily.split(",")[0].trim();
          const font = `${fontName}:${fontWeight}`;

          differentFontsWithWeights.add(font);

          // Scrape colors
          colors.add(style.color);
          colors.add(style.backgroundColor);

          // Scrape images
          /*
                            Possibilities:
                            1- Element is an image
                            2- Element has a background image
                            3- Element has a background image in a pseudo element
                     */

          // 1- Element is an image
          if (element.tagName === "IMG") {
            images.add(element.getAttribute("src") as string);
          }

          // 2- Element has a background image
          if (style.backgroundImage !== "none") {
            images.add(style.backgroundImage);
          }

          // 3- Element has a background image in a pseudo element
          const pseudoBefore = window.getComputedStyle(element, "::before");
          if (pseudoBefore.backgroundImage !== "none") {
            images.add(pseudoBefore.backgroundImage);
            colors.add(pseudoBefore.backgroundColor);
            colors.add(pseudoBefore.color);
          }

          const pseudoAfter = window.getComputedStyle(element, "::after");
          if (pseudoAfter.backgroundImage !== "none") {
            images.add(pseudoAfter.backgroundImage);
            colors.add(pseudoAfter.backgroundColor);
            colors.add(pseudoAfter.color);
          }
        }

        const fonts = Array.from(differentFontsWithWeights).reduce(
          (acc, font) => {
            const [name, weight] = font.split(":");
            const weights = acc[name] || [];
            weights.push(parseInt(weight));
            acc[name] = weights;
            acc[name].sort((a, b) => a - b);
            return acc;
          },
          {} as Record<string, Array<number>>
        );

        console.log(images);

        // Send the scraped data back
        sendResponse({
          fonts,
          colors: Array.from(colors),
          images: Array.from(images)
            .filter((img) => {
              return !img.includes("rgb");
            })
            .map((url) => imageUrlEditor(url, window.location.hostname)),
        });
    }
  }
);

export {};

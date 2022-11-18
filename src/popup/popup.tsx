import { FC, useState } from "react";
import { render } from "react-dom";
import { IMessage } from "../types";
import Fonts from "./components/Fonts";
import Images from "./components/Images";
import Colors from "./components/Colors";

const Popup: FC = () => {
  const [fonts, setFonts] = useState<Record<string, Array<number>>>({});
  const [images, setImages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  if (Object.entries(fonts).length === 0 && images.length === 0) {
    return (
      <div className={"container"}>
        <button
          onClick={async () => {
            console.log("Scraping");

            chrome.tabs.query(
              {
                active: true,
                currentWindow: true,
              },
              (tabs) => {
                chrome.tabs.sendMessage(
                  tabs[0].id!,
                  {
                    type: "scrape",
                  } as IMessage,
                  (response) => {
                    console.log("Response", response);
                    setFonts(response.fonts);
                    setImages(response.images);
                    setColors(response.colors);
                  }
                );
              }
            );
          }}
        >
          Scrape
        </button>
      </div>
    );
  }

  return (
    <div className={"container"}>
      <Fonts fonts={fonts} />
      <Colors colors={colors} />
      <Images images={images} />
    </div>
  );
};

render(<Popup />, document.getElementById("root"));

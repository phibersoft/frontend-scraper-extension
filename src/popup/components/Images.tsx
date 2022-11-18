import { FC } from "react";
import { zipper } from "../../utils";

interface Props {
  images: string[];
}

const Images: FC<Props> = ({ images }) => {
  return (
    <div className={"images"}>
      <h2>Images</h2>
      <div className={"result"}>
        {images.map((image, index) => {
          return <div key={`image-${index}`}>{image}</div>;
        })}
      </div>

      <button
        onClick={async (event) => {
          const button = event.target as HTMLButtonElement;

          button.disabled = true;
          button.innerText = "Downloading...";

          await zipper(images);

          button.disabled = false;
          button.innerText = "Download";
        }}
      >
        Download All Images ({images.length})
      </button>
    </div>
  );
};

export default Images;

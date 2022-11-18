import { FC } from "react";

interface Props {
  colors: string[];
}

const Colors: FC<Props> = ({ colors }) => {
  return (
    <div className={"colors"}>
      <h2>Colors</h2>

      <div className={"result"}>
        {colors.map((color, index) => {
          return (
            <div key={`color-${index}`}>
              <div className={"color"} style={{ backgroundColor: color }}></div>
              <span>{color}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Colors;

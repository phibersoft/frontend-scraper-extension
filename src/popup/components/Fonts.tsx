import { FC, useMemo, useState } from "react";

interface Props {
  fonts: Record<string, Array<number>>;
}

const Fonts: FC<Props> = ({ fonts }) => {
  const [viewType, setViewType] = useState<"list" | "scss" | "link">("list");

  // list: <font-name> <font-weight>, <font-name> <font-weight> \n <font-name> <font-weight>, <font-name> <font-weight>
  // scss: @import url('https://fonts.googleapis.com/css2?family=<font-name>:<font-weight>&display=swap');
  // link: <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=<font-name>:<font-weight>&display=swap">

  const fontList = Object.entries(fonts);
  const googleLink = useMemo(() => {
    return (
      fontList.reduce((acc, entry) => {
        if (!acc.endsWith("?")) acc += `&`;
        acc += `family=${entry[0]}:wght@`;
        acc += entry[1].join(";");
        return acc;
      }, "https://fonts.googleapis.com/css2?") + "&display=swap"
    );
  }, [fonts]);

  const scssView = useMemo(() => {
    return `@import url("${googleLink}")`;
  }, [googleLink]);

  const linkView = useMemo(() => {
    return `<link rel="stylesheet" href="${googleLink}" />`;
  }, [googleLink]);
  if (fontList.length === 0) return null;

  return (
    <div className={"fonts"}>
      <h2>Fonts</h2>
      <div className={"view-types"}>
        {(["list", "scss", "link"] as Array<typeof viewType>).map((type) => {
          return (
            <button
              className={viewType === type ? "active" : ""}
              key={type}
              onClick={() => setViewType(type)}
            >
              {type}
            </button>
          );
        })}
      </div>
      <div className="result">
        {viewType === "list" &&
          fontList.map((entry) => {
            return (
              <div key={`font-entry-${entry[0]}`}>
                <span className={"font-name"}>{entry[0]}</span>:
                <span className={"font-weights"}>{entry[1].join(", ")}</span>
              </div>
            );
          })}
        {viewType === "scss" && scssView}
        {viewType === "link" && linkView}
      </div>
    </div>
  );
};

export default Fonts;

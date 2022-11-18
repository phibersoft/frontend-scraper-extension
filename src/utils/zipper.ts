import JSZip from "jszip";

export const zipper = async (imageLinks: string[]) => {
  // Create a zip file
  const zip = new JSZip();

  // Loop over the image links
  for (let i = 0; i < imageLinks.length; i++) {
    const link = imageLinks[i];
    if (link.startsWith("data:image/")) {
      // data:image/png;base64,blabla...
      const [mimeType, base64] = link.split(","); // ["data:image/png;base64", "blabla..."]
      const type = mimeType.split(";")[0]; // "data:image/png"
      const extensionOrType = type.split("/")[1]; // png
      const extension = extensionOrType.includes("svg")
        ? "svg"
        : extensionOrType;
      const fileName = `image-${i}.${extension}`;
      zip.file(fileName, base64, { base64: true });
    } else {
      const fileName = `image-${i}.png`;
      const response = await fetch(link);
      const blob = await response.blob();
      zip.file(fileName, blob);
    }
  }

  // Download zip file using chrome.downloads API
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);

  chrome.downloads.download({
    url,
    filename: "images.zip",
  });
};

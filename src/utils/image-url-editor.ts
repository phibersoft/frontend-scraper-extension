export const imageUrlEditor = (url: string, baseURL: string) => {
  /*
          URL Can Be:
          1- https://<baseURL>/<relativePath>
          2- url(https://<baseURL>/<relativePath>)
          3- url("https://<baseURL>/<relativePath>")
          4- url('https://<baseURL>/<relativePath>')
          5- /relativePath
          6- url(/relativePath)
          7- url("/relativePath")
          8- url('/relativePath')
          9- relativePath
          10- url(relativePath)
          11- url("relativePath")
          12- data:image...
          13- url(data:image...)
          14- url("data:image...)
          15- url('data:image...)

          We need to handle all of these cases

          Here is the path:
          1- Remove url() and quotes if any
          2- If the url starts with https:// or http://, return it
          3- If the url starts with /, add the base url to it
          4- If the url starts with data:image, return it
          5- If the url starts with anything else, add the base url and the relative path to it


          Final Result:
          https://<baseURL>/<relativeURL>
      */
  url = url.replace(/url\((["']?)(.*)\1\)/, "$2");

  if (url.startsWith("http") || url.startsWith("data:")) return url;

  // If the url starts with /, add the base url to it
  if (url.startsWith("/")) return `https://${baseURL}${url}`;

  // If the url starts with anything else, add the base url and the relative path to it
  return `https://${baseURL}/${url}`;
};

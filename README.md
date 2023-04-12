# find restaurant

## Technique
google maps place api + vue3.

### Note
```
export async function getPhoto({ photo_reference, maxwidth, maxheight }) {
  const url = "/place/photo";
  const params = {
    key: process.env.VUE_APP_GOOGLE_KEY,
    photo_reference,
    maxwidth,
    maxheight,
  };
  const respond = await axios(url, {
    responseType: "arraybuffer", // 👈 important
    maxRedirects: 1,
    params,
  });
  console.log("get photo");
  return respond.data;
}
```

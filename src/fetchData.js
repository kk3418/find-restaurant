import axios from "axios";

export async function nearbySearch(center) {
  const url = "/place/nearbysearch/json";
  const params = {
    key: process.env.VUE_APP_GOOGLE_KEY,
    location: `${center.lat},${center.lng}`,
    radius: "200",
    keyword: "restaurant",
  };
  let respond;
  respond = await axios(url, {
    params,
  });
  console.log("fetch nearbySearch");
  return respond?.data.results;
}

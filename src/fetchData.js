import axios from "axios";

export async function nearbySearch(center) {
  const url = "/place/nearbysearch/json";
  const params = {
    key: process.env.VUE_APP_GOOGLE_KEY,
    location: `${center.lat},${center.lng}`,
    rankby: "distance",
    keyword: "restaurant",
  };
  let respond;
  respond = await axios(url, {
    params,
  });
  console.log("fetch nearbySearch");
  return respond?.data.results;
}

export async function distanceMatrix({ origins, destinations }) {
  const service = new window.google.maps.DistanceMatrixService();
  console.log("distanceMatrix");
  const { rows = [] } = await service.getDistanceMatrix({
    origins,
    destinations,
    unitSystem: window.google.maps.UnitSystem.METRIC,
    travelMode: "WALKING",
  });
  const { elements } = rows[0];
  return elements?.map(v => v.distance.text);
}

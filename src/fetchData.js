import axios from "axios";

export async function nearbySearch({ center, keyword }) {
  const url = "/place/nearbysearch/json";
  const params = {
    key: process.env.VUE_APP_GOOGLE_KEY,
    location: `${center.lat},${center.lng}`,
    rankby: "distance",
    keyword,
  };
  let respond;
  respond = await axios(url, { params });
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

export async function getPlaceDetail({ placeId }) {
  const url = "place/details/json";
  const params = {
    key: process.env.VUE_APP_GOOGLE_KEY,
    place_id: placeId,
    field: "photos",
  };
  let respond;
  respond = await axios(url, { params });
  console.log("fetch place photos");
  return respond?.data?.result;
}

export async function getPhoto({ photo_reference, maxwidth, maxheight }) {
  const url = "/place/photo";
  const params = {
    key: process.env.VUE_APP_GOOGLE_KEY,
    photo_reference,
    maxwidth,
    maxheight,
  };
  const respond = await axios(url, {
    responseType: "arraybuffer",
    maxRedirects: 1,
    params,
  });
  return respond.data;
}

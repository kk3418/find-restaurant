import axios from "axios";

export async function nearbySearch(center) {
    const url = "/place/nearbysearch/json";
    const params = {
        key: "AIzaSyArwUk0co_Ur3wviOtN0UI9_am-dN03hEA",
        location: `${center.lat},${center.lng}`,
        radius: "200",
        keyword: "restaurant",
    };
    const respond =  await axios(url, {
        params,
    });
    return respond;
}
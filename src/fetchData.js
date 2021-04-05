import axios from "axios";

export async function nearbySearch() {
    const url = "/place/nearbysearch/json";
    const params = {
        key: "AIzaSyArwUk0co_Ur3wviOtN0UI9_am-dN03hEA",
        location: "25.04,121.512",
        radius: "100",
        keyword: "restaurant",
    };
    const respond =  await axios(url, {
        params,
    });
    return respond;
}
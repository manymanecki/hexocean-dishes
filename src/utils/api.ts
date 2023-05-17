import axios from "axios";
import ApiConfig from "../configs/ApiConfig.json";

export async function postDish(obj: any) {
  try {
    const response = await axios.post(ApiConfig.apiUrl, obj, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
}

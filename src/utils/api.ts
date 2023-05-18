import axios, { AxiosError } from "axios";
import ApiConfig from "../configs/ApiConfig.json";

export async function postDish(obj: any) {
  try {
    return await axios.post(ApiConfig.apiUrl, obj, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return error as AxiosError;
  }
}

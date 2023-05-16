import axios from "axios";

export async function postDish(obj: any) {
  try {
    const response = await axios.post(
      "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
      obj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

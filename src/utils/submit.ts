import { SubmitHandler } from "react-hook-form";
import { postDish } from "./api";
import { IFormInput } from "../models/form";
import { AxiosError, AxiosResponse } from "axios";

export const submitDish: SubmitHandler<IFormInput> = async (data) => {
  const { name, preparation_time, type, options } = data;
  const obj = {
    name,
    preparation_time,
    type,
  };

  for (const element of options) {
    obj[element.name as keyof typeof obj] = element.value;
  }

  const response: AxiosResponse<any> | AxiosError<unknown, any> =
    await postDish(obj);
  return response;
};

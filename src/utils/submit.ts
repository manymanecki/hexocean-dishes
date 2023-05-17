import { SubmitHandler } from "react-hook-form";
import { postDish } from "./api";
import { IFormInput } from "../models/form";

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

  try {
    return await postDish(obj);
  } catch (error) {
    return error;
  }
};

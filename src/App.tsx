import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DishConfig from "./DishConfig.json";
import { postDish } from "./util/api";
import "./App.css";

const dishConfig: Configuration[] = DishConfig;

export interface IFormInput {
  name: string;
  preparation_time: string;
  configuration: Configuration;
}

export interface Configuration {
  type: string;
  options: Option[];
}

export interface Option {
  name: string;
  type: string;
  value: any;
}

function App() {
  const [dishType, setDishType] = useState("");
  const { register, unregister, handleSubmit, formState } =
    useForm<IFormInput>();

  const onSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    unregister(`configuration.options`);
    setDishType(e.target.value);
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const obj = {
      name: data.name,
      preparation_time: data.preparation_time,
      type: data.configuration.type,
    };
    data.configuration.options.forEach(
      (element: { name: string; value: any }) => {
        // @ts-ignore
        obj[element.name] = element.value;
      }
    );
    try {
      const jsonData = await postDish(obj);
      console.log(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="flex h-screen justify-center items-center">
        <div className="mockup-window opacity-0">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="grid grid-cols-1 gap-4 px-4 py-4 bg-base-200">
              <input
                {...register("name", { required: true })}
                placeholder="Dish Name"
                autoComplete="off"
              ></input>
              <input
                {...register("preparation_time", {
                  required: true,
                  pattern: {
                    value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
                    message:
                      "Invalid time format. Please enter in HH:MM:SS format.",
                  },
                })}
                type="text"
                placeholder="Preparation Time"
              ></input>
              <select
                {...register("configuration.type", { required: true })}
                value={dishType}
                onChange={onSwitch}
              >
                <option value="" disabled hidden>
                  Type:
                </option>
                {dishConfig.map((dish, index) => (
                  <option key={index} value={dish.type}>
                    {dish.type}
                  </option>
                ))}
              </select>
              {(
                dishConfig.find((dish) => dish.type === dishType) || {
                  options: [],
                }
              ).options.map((option: Option, index: number) => (
                <div key={option.name}>
                  <input
                    {...register(`configuration.options.${index}.value`, {
                      required: true,
                      valueAsNumber: option.type === "number",
                    })}
                    placeholder={option.name.replace(/_/g, " ")}
                    type="number"
                  />
                  <input
                    {...register(`configuration.options.${index}.name`)}
                    type="hidden"
                    value={option.name}
                  />
                </div>
              ))}
              <button className="btn" disabled={!formState.isValid}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

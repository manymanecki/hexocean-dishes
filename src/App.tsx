import React, { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IFormInput } from "./models/form";
import { submitDish } from "./utils/submit";
import DishConfig from "./configs/DishConfig.json";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [dishType, setDishType] = useState("");
  const [message, setMessage] = useState("");
  const { register, unregister, handleSubmit, formState } =
    useForm<IFormInput>();

  const switchModal = useCallback(() => {
    setShowModal((prevLoadingState) => !prevLoadingState);
  }, []);

  const switchLoading = useCallback(() => {
    setLoadingState((prevLoadingState) => !prevLoadingState);
  }, []);

  const onDishTypeSwitch = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      unregister(`options`);
      setDishType(e.target.value);
    },
    [unregister]
  );

  const onSubmit = useCallback(
    async (data: IFormInput) => {
      // switchModal();
      // console.log(data);
      // switchLoading();
      try {
        const result = await submitDish(data);
        setMessage(JSON.stringify(result));
      } catch (error) {
        setMessage(JSON.stringify(error));
        console.log(error);
      } finally {
        switchLoading();
        switchModal();
      }
    },
    [switchLoading, switchModal]
  );

  return (
    <div className="App">
      {showModal && <Modal setShowModal={setShowModal} />}
      <div className="mockup-window">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid grid-cols-1 gap-4 px-4 py-4 bg-base-200">
            <input
              {...register("name", {
                required: true,
              })}
              type="text"
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
                minLength: 8,
                maxLength: 8,
              })}
              type="text"
              placeholder="Time [hh:mm:ss]"
              minLength={8}
              maxLength={8}
            ></input>
            <select
              {...register("type", { required: true })}
              value={dishType}
              onChange={onDishTypeSwitch}
            >
              <option value="" disabled hidden>
                Type:
              </option>
              {DishConfig.map((dish, index) => (
                <option key={dish.type} value={dish.type}>
                  {dish.type}
                </option>
              ))}
            </select>
            {DishConfig.find((dish) => dish.type === dishType)?.options.map(
              (option, index) => (
                <div key={option.name}>
                  <input
                    {...register(`options.${index}.value`, {
                      required: option.required,
                      valueAsNumber: option.type === "number",
                    })}
                    placeholder={option.name.replace(/_/g, " ")}
                    type={option.type}
                  />
                  <input
                    {...register(`options.${index}.name`)}
                    type="hidden"
                    value={option.name}
                  />
                </div>
              )
            )}
            <button
              className={`btn ${loadingState ? `loading` : ``}`}
              disabled={!formState.isValid}
              onClick={switchLoading}
            >
              {loadingState ? "" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

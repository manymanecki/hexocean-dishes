import React, { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IFormInput } from "./models/form";
import { submitDish } from "./utils/submit";
import DishConfig from "./configs/DishConfig.json";
import Modal from "./components/Modal";
import "./App.css";
import { AxiosError } from "axios";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [dishType, setDishType] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

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

  const handleServerValidation = useCallback((data: AxiosError) => {
    setErrorMessage(JSON.stringify(data));
  }, []);

  const onSubmit = useCallback(
    async (data: IFormInput) => {
      setErrorMessage("");
      try {
        switchLoading();
        const response: any = await submitDish(data);
        switchLoading();
        if (
          response.response !== undefined &&
          response.response.status === 400
        ) {
          handleServerValidation(response.request.response);
        } else {
          setMessage(JSON.stringify(data));
          switchModal();
        }
      } catch (error) {
        console.log(error);
      }
    },
    [handleServerValidation, switchLoading, switchModal]
  );

  return (
    <div className="App">
      <form
        className="mockup-window"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className="grid grid-cols-1 gap-4 px-4 py-4 bg-base-200 w-80">
          <p className="break-all text-error">{errorMessage}</p>
          <input
            className={errors.name ? "input-error" : ""}
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
            className={errors.preparation_time ? "input-error" : ""}
            type="text"
            placeholder="Time [hh:mm:ss]"
          ></input>
          <select
            {...register("type", { required: true })}
            className={errors.type ? "input-error" : ""}
            value={dishType}
            onChange={onDishTypeSwitch}
          >
            <option value="" disabled hidden>
              Type:
            </option>
            {DishConfig.map((dish) => (
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
                  className={
                    errors.options?.[index]?.value ? "input-error" : ""
                  }
                />
                <input
                  {...register(`options.${index}.name`)}
                  type="hidden"
                  value={option.name}
                />
              </div>
            )
          )}
          <button className={`btn ${loadingState ? `loading` : ``}`}>
            {loadingState ? "" : "SUBMIT"}
          </button>
        </div>
      </form>
      {showModal && <Modal setShowModal={setShowModal} message={message} />}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import DishConfig from './DishConfig.json';
import './App.css';

const dishes: Configuration[] = DishConfig;

export interface IFormInput {
    name: string
    preparation_time: string
    configuration: Configuration
}

export interface Configuration {
    type: string
    options: Option[]
}

export interface Option {
    name: string
    type: string
}


function App() {
    const [ dishType, setDishType ] = useState("");
    const { register, handleSubmit, control } = useForm<IFormInput>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "configuration.options"
    });

    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
    // let fetchAPI = fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         'name': 'HexOcean pizza',
    //         'preparation_time': '01:30:22',
    //         'type': 'pizza',
    //         'no_of_slices': 4,
    //         'diameter': 33.4
    //     })
    // });

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDishType(e.target.value);
        console.log(fields)
    };

    // const configurationOptions = dishes.find((dish) => dish.type === dishType) || [];

    return <div className="App">
        <div className="flex h-screen justify-center items-center">
            <div className="mockup-window bg-white bg-opacity-30 backdrop-blur-md drop-shadow-lg shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 px-4 py-4 bg-base-200">
                        <input {...register("name", { required: true })} placeholder="Dish Name"
                               className="text-center input input-bordered"></input>
                        <input {...register("preparation_time", { required: true })} type="text" placeholder="hh:mm:ss"
                               className="text-center input input-bordered">
                        </input>
                        <select {...register("configuration.type", { required: true })} value={dishType} onChange={handleSelectChange}
                                className="select select-bordered">
                            <option value="" disabled hidden>Dish type:</option>
                            {dishes.map((dish) => (
                                <option key={dish.type.toString()} value={dish.type.toString()}>
                                    {dish.type.toString()}
                                </option>
                            ))}
                        </select>
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <input
                                    {...register(`configuration.options.${index}.name` as const, { required: true })}
                                    type={`configuration.options.${index}.type`}
                                    placeholder={`configuration.options.${index}.name`}
                                    className="text-center input input-bordered"
                                />
                            </div>
                        ))}
                        {/*{dishOptions.length > 0 && (*/}
                        {/*    <>*/}
                        {/*        {dishOptions.map((option) => (*/}
                        {/*            <div key={option.toString()}>*/}
                        {/*                <input*/}
                        {/*                    type="number"*/}
                        {/*                    step="any"*/}
                        {/*                    className="text-center input input-bordered"*/}
                        {/*                    id={option.toString()}*/}
                        {/*                    name={option.toString()}*/}
                        {/*                    placeholder={option.replace(/_/g, " ")}>*/}
                        {/*                </input>*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*    </>*/}
                        {/*)}*/}
                        <button className="btn" disabled={false}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>;
}

export default App;
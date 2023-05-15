import React, { useState } from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import DishConfig from './DishConfig.json';
import './App.css';

const dishConfig: Configuration[] = DishConfig;

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

    const selectedConfig = dishConfig.find(config => config.type === dishType) || { options: [] };

    const onClick = console.log(selectedConfig)

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
                        <select {...register("configuration.type", { required: true })} value={dishType} onChange={e => setDishType(e.target.value)}
                                className="select select-bordered">
                            <option value="" disabled hidden>Dish type:</option>
                            {dishConfig.map((dish, index) => (
                                <option key={index} value={dish.type}>
                                    {dish.type}
                                </option>
                            ))}
                        </select>
                        {dishType && selectedConfig.options.map((option: Option, index: number) => (
                            <div key={option.name}>
                                {/*<Controller*/}
                                {/*    name={`configuration.options.${index}.name`}*/}
                                {/*    control={control}*/}
                                {/*    rules={{ required: true }}*/}
                                {/*    render={*/}
                                {/*        ({ field }) => <input className="text-center input input-bordered" placeholder="Test" type={option.type} {...field} />*/}
                                {/*    }*/}
                                {/*/>*/}
                                <input {...register("name", { required: true })} type={option.type} placeholder={option.name.replace(/_/g, ' ')}
                                       className="text-center input input-bordered">
                                </input>
                            </div>
                        ))}
                        <button className="btn" disabled={false} onClick={() => {
                            console.log(selectedConfig.options);
                        }}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>;
}

export default App;
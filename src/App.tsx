import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import DishesList from './DishesList.json';
import './App.css';

const dishes: IFormInput[] = DishesList;

interface IFormInput {
    name?: String;
    preparation_time?: String; //TODO zmienic na czas
    type: String;
    options?: String[];
}

function App() {
    const [ dishType, setDishType ] = useState("");
    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    let fetchAPI = fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'HexOcean pizza',
            'preparation_time': '01:30:22',
            'type': 'pizza',
            'no_of_slices': 4,
            'diameter': 33.4
        })
    });

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDishType(e.target.value);
    };

    const dishOptions = dishes.find((dish) => dish.type === dishType)?.options || [];

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
                        <select {...register("type", { required: true })} value={dishType} onChange={handleSelectChange}
                                className="select select-bordered">
                            <option value="" disabled hidden>Dish type:</option>
                            {dishes.map((dish) => (
                                <option key={dish.type.toString()} value={dish.type.toString()}>
                                    {dish.type.toString()}
                                </option>
                            ))}
                        </select>
                        {dishOptions.length > 0 && (
                            <>
                                {dishOptions.map((option) => (
                                    <div key={option.toString()}>
                                        <input
                                            type="number"
                                            step="any"
                                            className="text-center input input-bordered"
                                            id={option.toString()}
                                            name={option.toString()}
                                            placeholder={option.replace(/_/g, " ")}>
                                        </input>
                                    </div>
                                ))}
                            </>
                        )}
                        <button className="btn" disabled={false}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>;
}

export default App;
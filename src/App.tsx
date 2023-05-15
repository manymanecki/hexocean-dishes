import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import DishJSON from './Dish.json';
import './App.css';

interface IDish {
    name: String;
    options?: String[];
}

const dishes: IDish[] = DishJSON;

interface IFormInput {
    dishName: String;
    dishDuration: String; //TODO zmienic na czas
}

function App() {
    const [dishType, setDishType] = useState("");
    const [showOption, setShowOption] = useState(false);

    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDishType(e.target.value);
        if (e.target.value !== "") setShowOption(true);
        else setShowOption(false);
    };

    return <div className="App">
        <div className="flex h-screen justify-center items-center">
            <div className="mockup-window bg-base-300 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 px-4 py-4 bg-base-200">
                        <h2 className="text-center">Input your favorite dish!</h2>
                        <input {...register("dishName", { required: true })} placeholder="Dish Name"
                               className="text-center input input-bordered"></input>
                        <input {...register("dishDuration", { required: true })} placeholder="Preparation (Duration)"
                               className="text-center input input-bordered"></input>
                        <select value={dishType} onChange={handleSelectChange} className="select select-bordered">
                            <option value="" disabled selected hidden>Dish type?</option>
                            {dishes.map((dish) => (
                                <option key={dish.name.toString()} value={dish.name.toString()}>
                                    {dish.name.toString()}
                                </option>
                            ))}
                        </select>
                        {
                            showOption ? <p>test!</p> : ""
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>;
}

export default App;
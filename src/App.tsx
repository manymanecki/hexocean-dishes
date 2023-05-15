import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import DishJSON from './Dish.json';
import './App.css';

interface IDish {
    type: String;
    options?: String[];
}

const dishes: IDish[] = DishJSON;

interface IFormInput {
    dishName: String;
    dishDuration: String; //TODO zmienic na czas
}

function App() {
    const [dishType, setDishType] = useState("");

    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDishType(e.target.value);
    };

    const dishOptions = dishes.find((dish) => dish.type === dishType)?.options || [];

    return <div className="App">
        <div className="flex h-screen justify-center items-center">
            <div className="mockup-window bg-base-300 shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 px-4 py-4 bg-base-200">
                        <input {...register("dishName", { required: true })} placeholder="Dish Name"
                               className="text-center input input-bordered"></input>
                        <input type="text" name="duration" id="durationForm" maxLength={8}
                               pattern="^((\d+:)?\d+:)?\d*$" placeholder="hh:mm:ss" className="text-center input input-bordered">
                        </input>
                        <select value={dishType} onChange={handleSelectChange} className="select select-bordered">
                            <option value="" disabled selected hidden>Dish type?</option>
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
                                        <input type="text" className="text-center input input-bordered"
                                               id={option.toString()} name={option.toString()} placeholder={option.toString()} />
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
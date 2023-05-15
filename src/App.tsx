import React, {useState} from 'react';
import './App.css';

function App() {

  return <div className="App">
      <div className="flex h-screen justify-center items-center">
          <div className="mockup-window bg-base-300 shadow-2xl">
              <div className="grid grid-cols-1 gap-4 px-4 py-4 bg-base-200">
                  <h2 className="text-center">Input your favorite dish!</h2>
                  <input placeholder="Dish Name" className="text-center input input-bordered"></input>
                  <input placeholder="Preparation (Duration)" className="text-center input input-bordered"></input>
                  <select className="select select-bordered">
                      <option value="" disabled selected hidden>Type:</option>
                      <option value="pizza">Pizza</option>
                      <option value="soup">Soup</option>
                      <option value="sandwich">Sandwich</option>
                  </select>
              </div>
          </div>
      </div>
  </div>;
}

export default App;
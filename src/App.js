import './App.css';
import mapboxgl from 'mapbox-gl';
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Legend from "./components/legend";
import Status from "./components/status";
import MapContainer from "./components/mapContainer";
import {options} from "./const";
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyZGVlcGsiLCJhIjoiY2tvbjU3NDR3MGQybzJvcG9uMXBxcGV5YiJ9.JHaRIsJ4o9JRXWME5T9FUA'


const App = () => {

  const [selected, setSelected] = useState(null);
  const [isError, setIsError] = useState(false);



  const selectedPoint = (feature) => setSelected(feature);

  const error = (value) => setIsError(value);

  return (
    <div className="App">
      <header className="App-header">Spin Coding Assessment</header>
      <section className="spin-container">
        <MapContainer selectedMap = {selectedPoint} error={error}/>
        <Legend stops={options[0].stops} />
      </section>

       <Status selected = {selected} error = {isError}/>
    </div>


  );
}

export default App;

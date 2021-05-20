import './App.css';
import mapboxgl from 'mapbox-gl';
import {useState} from "react";
import Legend from "./components/legend";
import Status from "./components/status";
import Error from "./components/error";
import Map from "./components/map"
import {options} from "./const";
import {IFeature} from "./Models/map";
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyZGVlcGsiLCJhIjoiY2tvbjU3NDR3MGQybzJvcG9uMXBxcGV5YiJ9.JHaRIsJ4o9JRXWME5T9FUA'


const App = () => {

  const [selected, setSelected] = useState<any>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const selectedPoint = (feature: IFeature) => setSelected(feature);


  const error = (value:boolean) => setIsError(value);


  return (
    <div className="App">
      <header className="App-header">Spin Coding Assessment</header>
      <section className="spin-container">
          <Map selectedMap={selectedPoint} error={error}/>
        <Legend stops={options[0].stops} />
      </section>

        {!isError ? <Status selected = {selected} error = {isError}/> :<Error/>}
    </div>


  );
}

export default App;

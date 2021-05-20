import './App.css';
import mapboxgl from 'mapbox-gl';
import {useEffect, useRef, useState} from "react";
import Legend from "./components/legend";
import Status from "./components/status";
import MapContainer from "./components/mapContainer";
import Map from "./components/map"
import {options} from "./const";
import {IError, IFeature,IMapSelected,ILoading} from "./Models/model";
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFyZGVlcGsiLCJhIjoiY2tvbjU3NDR3MGQybzJvcG9uMXBxcGV5YiJ9.JHaRIsJ4o9JRXWME5T9FUA'


const App = () => {

  const [selected, setSelected] = useState<any>({id: 0, status: ""});
  const [isError, setIsError] = useState<boolean>(false);
  const[loading, setLoading] = useState<boolean>(false);



  const selectedPoint = (feature: any) => {
      setSelected(feature);
      setLoading(true);
  };

  const error = (value) => setIsError(value);

  return (
    <div className="App">
      <header className="App-header">Spin Coding Assessment</header>
      <section className="spin-container">
          <Map selectedMap={selectedPoint} error={error}/>
        <Legend stops={options[0].stops} />
      </section>

        {loading && <Status selected = {selected} error = {isError}/> }
    </div>


  );
}

export default App;

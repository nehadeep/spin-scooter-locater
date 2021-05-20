import React, {useEffect, useRef, useState} from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

const MapContainer = ({selectedMap, error}:any)=>{
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);


    useEffect(()=>{


        const attachMap =  (setMap: React.Dispatch<React.SetStateAction<any>>,mapContainer:React.RefObject<HTMLElement>)=>{
            if(!mapContainer.current){
                return
            }
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v10',
                center: [-122.40674, 37.75303],
                zoom: 13.5
            });
            map.on('load',async (e)=>{
                error(false);
              //  const fetchData = async ()=>{

                    try{
                        let url ='https://0e6e3ma6v0.execute-api.us-east-1.amazonaws.com/vehicles';
                        const {data} = await axios(url);
                     //   const finalData = new FeatureCollection(data.features);
                       // console.log("final ata", finalData)
                        data.features.forEach((obj:any,i:number)=>obj.properties.id=i);

                        map.addSource('status', {
                            'type': 'geojson',
                            'data': data
                        });
                        map.addLayer({
                            'id': 'locations',
                            'type': 'circle',
                            'source': 'status',
                            'paint':{
                                'circle-radius':{
                                    'base': 1.5,
                                    'stops':[[12,2],[22,180]]

                                },
                                'circle-color':[
                                    'match',
                                    ['get','status'],
                                    'available',
                                    '#00FF00',
                                    'not_available',
                                    '#ff0000',
                                    'rented',
                                    '#3354FF',
                                    '#000'
                                ]
                            }

                        });

                    } catch (e) {
                        error(true);
                    }

                //};
               // fetchData();

            });

            console.log("map", map)

        };

        !map && attachMap(setMap, mapContainer);
        setMap(map);

      //  return () => map.remove();
    },[map]);


    {/*
 // @ts-ignore */}
 //    const selectScooter =  (current:GeoJson) =>{
 //        console.log("map", map)
 //
 //       map.flyTo({
 //            center: current.geometry.coordinates,
 //            zoom: 15
 //        })
 //    };

    // useEffect(()=>{
    //
    //
    //         map.on('click', (e) => {
    //             let feature = map.queryRenderedFeatures(e.point, {
    //                 layers: ['locations']
    //             });
    //             if (feature.length) {
    //              //   selectScooter(feature[0]);
    //                 selectedMap(feature[0].properties)
    //             }
    //         })
    //
    //
    // },[map, selectedMap]);

    return(

        <div id="map" className="map-container" ref={mapContainer}/>
    )
};

export default MapContainer;
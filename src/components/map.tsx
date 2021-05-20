import React, {FunctionComponent, useEffect, useRef, useState} from "react";

import mapboxgl from "mapbox-gl";
import axios from "axios";

 const Map: FunctionComponent<any> = ({selectedMap,error}): any => {
    const mapDiv = useRef<HTMLDivElement>(null);
    let [map, setMap] = useState<any>(null);


    useEffect(() => {
        const attachMap = (setMap: React.Dispatch<React.SetStateAction<any>>, mapDiv: React.RefObject<HTMLDivElement>) => {
            const map = new mapboxgl.Map({
                container: mapDiv.current || '', // NO ERROR
                style: 'mapbox://styles/mapbox/dark-v10',
                center: [-122.40674, 37.75303],
                zoom: 13.5
            });
            map.on('load',async (e)=>{
                error(false);

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
                    console.log("error",e)
                 error(true);
                }

            });
            setMap(map);
        };

        !map && attachMap(setMap, mapDiv)

    }, [map,error]);


        const selectScooter =  (current:any) =>{
            console.log("map-current", current)

           map.flyTo({
                center: current.geometry['coordinates'],
                zoom: 15
            })
        };

     useEffect(()=>{

         if(!map) return;
             map.on('click', (e) => {
                 let feature = map.queryRenderedFeatures(e.point, {
                     layers: ['locations']
                 });
                 if (feature.length) {
                     selectScooter(feature[0]);
                     selectedMap(feature[0].properties)
                 }
             })


     },[map]);

    return (
        <div id="map" className="map-container" ref={mapDiv} />
    )

};
 export default Map
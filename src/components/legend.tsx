import React from "react";
import './legend.css'
const Legend = (props:any) => {
    const renderLegendKeys = (stop:any[], i:number) => {
        return (
            <div key={i} className="txt-s">
        <span
            className="round-full"
            style={{ backgroundColor: stop[1] }}
        />
                <span>{`${stop[0].toLocaleString()}`}</span>
            </div>
        );
    };

    return (
        <>
            <div className="status-container">
                {props.stops.map(renderLegendKeys)}
            </div>
        </>
    );
};

export default Legend;
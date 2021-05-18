import scooter from "../scooter.png";
import React from "react";
import './status.css';
const Status = ({selected, error}) =>{

    const style = () =>{
        if(selected.status==='available'){
            return { backgroundColor: '#00FF00'} ;
        } else if(selected.status==='not_available'){
            return {backgroundColor: '#ff0000'}
        } else{
            return {backgroundColor: '#3354FF'}
        }
    };

        return(
            <>
                {!error? selected && <footer>
                <div className="status-display">
                    <img src={scooter} width="30" height="30" alt="scooter"/>
                    <div className="scooter-availability">
                    <label>Status: </label>
                    <span className="round-full"
                    style={style()}/>
                        {selected.status.split('_').join(' ')}
                    </div>
               </div>
                </footer>: <footer> <span className="error">Something went wrong.Please Try again!!.</span></footer>

             }
            </>
        )

};
export default Status;
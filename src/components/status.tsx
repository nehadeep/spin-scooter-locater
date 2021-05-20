import scooter from "../scooter.png";
import React, {FunctionComponent} from "react";
import './status.css';
import {Colors} from "../Models/model";
import {IFeature} from "../Models/map";

interface IProps {
    selected: IFeature;
    error:boolean
}
const Status:FunctionComponent<IProps> = ({selected, error}:IProps) =>{
    console.log("error", error)

    const style = () =>{
        if(selected.status==='available'){
            return { backgroundColor:Colors.Available} ;
        } else if(selected.status==='not_available'){
            return {backgroundColor: Colors.Not_Available}
        } else{
            return {backgroundColor: Colors.Rented}
        }
    };

        return(
            <>
                {selected && <footer>
                <div className="status-display">
                    <img src={scooter} width="30" height="30" alt="scooter"/>
                    <div className="scooter-availability">
                    <label>Status: </label>
                    <span className="round-full"
                    style={style()}/>
                        {selected.status.split('_').join(' ')}
                    </div>
               </div>
                </footer>

             }
            </>
        )

};
export default Status;
import React from "react";
import Card from "./Card";

function Time(props){
    return(
        <div>
            <h2>{new Date().toISOString()}</h2> 
            <Card />
        </div>
    )
}

export default Time;
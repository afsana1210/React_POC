import React from "react";

function Greeting(){
    const date = new Date(2020,6,31,17);
    const hours = date.getHours();
    let timeofday;
    const styles={
        fontSize:30
    }
    if(hours < 12){
        timeofday = 'morning';
        styles.color="#04756F";
    }  
    else if(hours >= 12 && hours < 17){
        timeofday = 'afternoon';
        styles.color="#2E0927";
    }
    else{
        timeofday = "night";
        styles.color="#D90000";
    }
    
    return(
        <h1 style={styles}>Good {timeofday}!</h1>
    )
}
export default Greeting
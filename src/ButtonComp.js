import React from "react";

const ButtonComp=(props)=>{
    let defaultValue='';
   const onSubmitClick=(e)=>{
      console.log("click", defaultValue);
      props.recievedDefaultValue(defaultValue);
    }
    const onInputChange=(e)=>{
        console.log(e.target.value);
        defaultValue = e.target.value;
    }
return(
    <div>
        <input type="text" onChange={onInputChange}></input>
        <button onClick={onSubmitClick}>submit</button>
        <button>click Me</button>
    </div>
)
}
export default ButtonComp;
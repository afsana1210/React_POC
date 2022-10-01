import react from "react";

const Comp3=(props)=>{
    const {handleClick,count}=props;
    return(
        <div>
         <button onClick={()=>handleClick()}>Click Me</button>
        </div>
        
    )

}
export default Comp3;
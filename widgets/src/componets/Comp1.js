import react,{ useState } from "react";
import Comp3 from "./Comp3";



const Comp1=()=>{
const[count,setCount]=useState(0);
const handleClick=()=>{
    setCount(count+1);
}
return(
   <>
    <Comp3 onClick={handleClick} count={count}/>
   </>
    
);


}
export default Comp1;
import React , {useState,useEffect} from "react";

const Count =() =>{
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log('TEST!');
      }, [count]);

    const onButtonClick=()=>{
        setCount(count+1);
    }
    return(
        <div>
          <button onClick={onButtonClick}>Click Me!</button>
          <h1>Current Count: {count}</h1>
        </div>
        
    );
}
export default Count;

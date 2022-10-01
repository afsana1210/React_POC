import React from "react";


function Jokes(props){
    // return(
    //     <div>
    //      {props.items.map(item=>{
    //      <Jokes key={item.id} question={item.question} answer={item.answer}/>
    //     </div>
        

    // }}
    // )
    return(
        <div>
            <h3 style={{display: !props.question && "none" }}>Question:{props.question}</h3>
            {/* <h3 style={{display:props.question ? "block" : "none" }}>Question:{props.question}</h3> */}
            <h3 style={{color: !props.question && "#888888"}}>Answer:{props.answer}</h3>
            {/* // {jokeComponent} */}
        </div>
    );
}
export default Jokes;
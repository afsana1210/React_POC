
import React from "react";

function handleClick(){
  console.log("Clicked")
}
function EventHandling(){
        return(
            <div>
                <img onMouseOver={()=>console.log("Hovered")}
                 src="https://images.unsplash.com/photo-1615789591457-74a63395c990?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=100&q=40"/>
                <br />
                <br />
                <button  onClick={handleClick}>Click Me</button>
            </div>
        )
}


export default EventHandling;
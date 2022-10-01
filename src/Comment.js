import React from "react";
import UserInfo from "./UserInfo";

function Comment(props){
   return(
       <div className="Comment">
           <UserInfo user={props.name}/>
           <div className="Comment-text">
               {props.text}
           </div>
           <div className="Comment-date">
               {new Date().toISOString()}
           </div>
       </div>
   );
}
export default Comment;
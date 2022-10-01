import React, { useState } from "react";

const UserListDisplay = (props) =>{
   const {userLists} = props;
   const [isShown, setIsShown] = useState(false);

   const renderlist= userLists.map(list=><li>{list.text}</li>);

   return(
       
            <li onMouseOver={()=>console.log("hover")}>{renderlist}</li>
   )
}

export default UserListDisplay;
import React, { useState } from "react";
import SearchBarComp from "./SearchBarComp";
import UserListDisplay from "./UserListDisplay";

const UserListComp =(props) =>{

    const[userLists,setUserLists] =useState([{}]);

    const  displayUserInput=(text)=>{
        setUserLists([...userLists ,{text:text}]);
    }

    return(
         <>
           
           <SearchBarComp displayUserInput={displayUserInput}/> 
           <UserListDisplay userLists={userLists} />
         </>
        
    )

}

export default UserListComp;
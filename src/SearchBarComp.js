import React, { useState } from "react";

const SearchBarComp =(props) => {
    const {displayUserInput} = props;
    const [userInputText , setUserInputText] = useState();



    const setUserTextChange =(e) =>{
        setUserInputText(e.target.value);
    }
    const setUserInputChange =(e)=>{
        e.preventDefault();
        displayUserInput(userInputText);
    }

    return(
        <>
           <div className="search-bar ui segment">
                <form className="ui form">
                    <div className="field"></div>
                    <input onChange={setUserTextChange}></input>
                    <button onClick={setUserInputChange}>Add</button>
                </form>
            </div>
        </>
        
        
    )
}

export default SearchBarComp ;
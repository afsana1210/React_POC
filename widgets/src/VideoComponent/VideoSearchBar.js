import React from "react";
import { useState } from "react/cjs/react.production.min";

const VideoSearchBar=({onFormSubmit})=>{
    const[terms,setTerms]=useState('');
    // const onInputChange=(event)=>{
    //     setTerms(event.target.value);
    // }
    const onSubmit = (event) => {
        event.preventDefault();

        onFormSubmit(terms);
    };
    return(
        <div className="search-bar ui segment">
            <form onSubmit={onSubmit} className="ui form">
                <div className="field">
                <label> Video Search</label>
                <input 
                  type="text" 
                  value={terms}
                  onChange={(event)=>setTerms(event.target.value)}
                  />
                </div>
            </form>
        </div>
    );
}

export default VideoSearchBar;
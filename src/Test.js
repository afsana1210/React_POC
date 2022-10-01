import React from "react";

class Test extends React.Component{
    constructor(){
        super()
        this.state={
            name:"afsana",
            age:"22"
        }
    }

    render(){
        return(
            <div>
                <h2>{this.state.name}</h2>
                <h2>{this.state.age} years old.</h2>
            </div>
        );
    }
    
}
export default Test;
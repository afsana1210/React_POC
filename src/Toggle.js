import React from "react";

class Toggle extends React.Component{
    constructor(props){
        super(props)
        this.state={isToggleOn:true}
        this.handlClick=this.handlClick.bind(this);
        
    }
    handlClick(){  
      this.setState(prevState=>({ 
        isToggleOn:!prevState.isToggleOn
      }))
    }

    render(){
        return(
            <div>
                <button onClick={this.handlClick}>{this.state.isToggleOn ? "ON" : "OFF"}</button>

            </div>
        )
    }
}
export default Toggle;

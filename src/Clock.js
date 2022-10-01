import React from "react";

class Clock extends React.Component{
    state={time:" "}

    componentDidMount(){
        setInterval(()=>{
            this.setState({
                time:new Date().toLocaleTimeString()
            })
        },1000);
    }
    render(){
        return(
            <div>
                Time is:{this.state.time}
            </div>
        )
    }
}
export default Clock;
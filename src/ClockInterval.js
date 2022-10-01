import React from "react";

class ClockInterval extends React.Component{
    constructor(props){
        super(props)
        this.state={date:new Date()}
    }
    componentDidMount(){
        this.TimerId=setInterval(()=>this.Tick(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.TimerId);
    }
    Tick(){
        this.setState({
            date:new Date()
        })
    }
    render(){
        return(
            <div>
                <h1>{this.state.date.toLocaleTimeString()}</h1>
            </div>
        )
    }
}
export default ClockInterval;
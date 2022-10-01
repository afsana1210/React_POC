import React from "react";

class UserLoggingState extends React.Component{
    constructor(){
        super()
        this.state={
            isLoggedIn:true
        }
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(){
        this.setState(prevState=>{
            return{
                isLoggedIn: !prevState.isLoggedIn
            }
        })
    }
    render(){
        let buttonText = this.state.isLoggedIn ? "Log Out" : "Log In"
        return(
            <div>
                <button onClick={this.handleChange}>{buttonText}</button>
            </div>
        )
    }
}
export default UserLoggingState
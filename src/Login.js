import React from "react";

class Login extends React.Component{
     constructor(){
         super()
         this.state={
             isLoggedIn:true
         }
     }
    render(){
        return(
          <div>
              <h2>You are currently logged{this.state.isLoggedIn===true ? " in " : " out "}</h2>
          </div>
        );
    }
}
export default Login;
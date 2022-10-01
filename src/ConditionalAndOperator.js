import React from "react";
import App from "./App";

class ConditionalAndOperator extends React.Component{
  constructor(){
      super()
      this.state={
        unreadmsg:['a','b']
      }
  }
  render(){
      return(
          <div>
              {this.state.unreadmsg.length> 0 && <h2> You have{this.state.unreadmsg.length} unread messages.</h2>}
          </div>
      )
  }
}
export default ConditionalAndOperator;
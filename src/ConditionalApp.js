import React ,{Component} from "react";
import App from "./App";
import Conditional from "./Conditional";
class ConditionalApp extends Component{
  constructor(){
      super()
      this.state={
          isLoading:true
      }
  }
  componentDidMount(){
      setTimeout(()=>{
          this.setState({
              isLoading: false
          })
      },1500)
  }
  render(){
      return(
       <div>
           {
             this.state.isLoading ? 
             <h2>Loading....</h2> : <Conditional />
           }
       </div>
      )  
  }
}
export default ConditionalApp;
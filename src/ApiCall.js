import React from "react";

class ApiCall extends React.Component{
  constructor(){
      super()
      this.state={
          Loading: false,
          character : []
      }
  }
  componentDidMount(){
      this.setState({
          Loading : true
      })
      fetch("https://swapi.dev/api/films/1/")
      .then(response=>response.json())
      .then(data=>{
          console.log(data);
          this.setState({
              character : data
          })
      })
      
  }
  render(){
      const text= this.state.Loading==true ? "loading... " : this.state.character.title 
      return(
          <div>
              {text}
              {/* {this.state.character.title}<br/>
              {this.state.character.producer}<br/>
              { this.state.character.episode_id} */}
          </div>

      )
  }
}
export default ApiCall;
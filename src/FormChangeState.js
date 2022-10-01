import React from "react";

class FormChangeState extends React.Component{
  constructor(){
      super()
      this.state={
          firstName:"",
          lastName:"",
          isFriendly: false,
          gender:" ",
          favcolor:" "
      }
      this.handleChange=this.handleChange.bind(this);
  }
  handleChange(event){
      const {name,value,type,checked}=event.target
      type=== "checked" ?
      this.setState({
    //    [event.target.name]:event.target.value
          [name]:checked
      }) :
      this.setState({
        //    [event.target.name]:event.target.value
              [name]:value
          })

  }
  render(){
      return(
          <form onSubmit={this.handleSubmit}>
              <input type="text" name="firstName"  value={this.state.firstName} placeholder="First Name" onChange={this.handleChange}></input>
              <br/>
              <input type="text" name="lastName" value={this.state.lastName} placeholder="Last Name" onChange={this.handleChange}></input>
              <textarea defaultValue={"some default value"}/><br/>
              <label>
                  <input type="checkbox" name="isFriendly" checked={this.state.isFriendly} onChange={this.handleChange}/> Is Friendly
              </label>
              <br/>
              <label>
                  <input type="radio" name="gender" value="male" checked={this.state.gender==='male'} onChange={this.handleChange}/>Male
              </label><br/>
              <label>
                  <input type="radio" name="gender" value="female" checked={this.state.gender==='female'} onChange={this.handleChange}/>Female
              </label>
              <br/>
              <label>Favourite color:</label>
              <select
              value={this.state.favcolor}
              onChange={this.handleChange}
              name="favcolor"
              >
                  <option name="blue">Blue</option>
                  <option name="green">Green</option>
                  <option name="red">Red</option>
              </select>
              <h1>{this.state.firstName}{this.state.lastName}</h1>
              <h1>You are a {this.state.gender}</h1>
              <h2>Your favourite color is{this.state.favcolor}</h2>
              <button>Submit</button>
          </form>
      )
  }
}
export default FormChangeState;
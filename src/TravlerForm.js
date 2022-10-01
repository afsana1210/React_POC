import React from "react";

class TravlerForm extends React.Component{
  constructor(){
      super()
      this.state={
          firstName:"",
          lastName:"",
          age:"",
          gender:"",
          destination:"",
          isLactoseFree:false,
          isVegan:false,
          isKosher:false,
          gender:""

      }
      this.handleChange=this.handleChange.bind(this)
  }
  handleChange(event){
      const {name,value,type,checked}=event.target
      type === "checkbox" ?
      this.setState({
            [name]: checked   
      })
      :
      this.setState({
          [name]:value
      })

  }
  render(){
      return(
          <main>
              <form>
                  <input 
                  name="firstName" 
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  placeholder="First Name"></input><br/>
                  <input
                  name="lastName" 
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  placeholder="Last Name"></input><br />
                  <input 
                  name="age" 
                  value={this.state.age}
                  onChange={this.handleChange}
                  placeholder="Age"></input>
                  <br/>
                  <label>
                      <input 
                      type="radio"
                      name="gender"
                      value="male"
                      checked={
                          this.state.gender==='male'
                      }
                      onChange={this.handleChange}
                      />Male
                  </label>
                  <br/>
                  <label>
                      <input 
                      type="radio"
                      name="gender"
                      value="female"
                      checked={
                          this.state.gender==='female'
                      }
                      onChange={this.handleChange}
                      />Female
                  </label>
                  <br/>
                  <select 
                  name="destination" 
                  value={this.state.destination}
                  onChange={this.handleChange}
                  >   
                      <option value="">--Please choose destination--</option>
                      <option value="germany">Germany</option>
                      <option value="norway">Norway</option>
                      <option value="north pole">North Pole</option>
                      <option value="south pole">South pole</option>
                  </select>
                  <br/>
                  <label>
                      <input
                        type="checkbox"
                        name="isLactoseFree"
                        onChange={this.handleChange}
                        checked={this.state.isLactoseFree}
                      />Is LactoseFree
                  </label>
                  <br/>
                  <label>
                      <input
                        type="checkbox"
                        name="isVegan"
                        onChange={this.handleChange}
                        checked={this.state.isVegan}
                      />Vegan
                  </label>
                  <br/>
                  <label>
                      <input
                        type="checkbox"
                        name="isKosher"
                        onChange={this.handleChange}
                        checked={this.state.isKosher}
                      />Kosher
                  </label><br/>
                  <button>Submit</button>
              </form>
              <br/>
              <h1>Enter Information:</h1>
              <p>Your name: {this.state.firstName}{this.state.lastName}</p>
              <p>Your age: {this.state.age}</p>
              <p>Your destinatio: {this.state.destination}</p>
              <p>Your age: {this.state.gender}</p>
              <p>Your dietry Restrictions:</p>
                <p> Vegan: {this.state.isVegan ? "Yes" : "No"} </p>
                <p>  Kosher: {this.state.isKosher ? "Yes" : "No"} </p>
                <p>  Lactose Free: {this.state.isLactoseFree ? "Yes" : "No"} </p>
          </main>
      )
  }
}
export default TravlerForm


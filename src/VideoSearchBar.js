import React from "react";

export default class VideoSearchBar extends React.Component{
    state={terms: ''};
    onInputChange=(event)=>{
        this.setState({ terms :event.target.value })
    }
    //form is submit by browser bydefult to prevent that we are using this method.whenever we search and hit enter browser submit it. 
    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.onFormSubmit(this.state.terms);
    }
    render(){
      return(
          <div className="search-bar ui segment">
              <form onSubmit={this.onFormSubmit}className="ui form">
                  <div className="field">
                  <label> Video Search</label>
                  <input 
                    type="text" 
                    value={this.state.terms}
                    onChange={this.onInputChange}
                    />
                  </div>
              </form>
          </div>
      );
  }
}
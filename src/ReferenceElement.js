import React from "react";

class ReferenceElement  extends React.Component{
        constructor(props) {
           super(props);
           this.txtSearch = null;
           this.state = { term: '' };
           this.setInputSearchRef = e => {
              this.txtSearch = e;
              console.log("search",this.txtSearch);
           }
        }
        onInputChange(event) {
           this.setState({ term: this.txtSearch.value });
        }
        render() {
           return (
              <input
                 value={this.state.term}
                 onChange={this.onInputChange.bind(this)}
                 ref={this.setInputSearchRef} />
           );
        }
     }

export default ReferenceElement;
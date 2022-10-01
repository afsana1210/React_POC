import React from "react";

class MemeGenerator extends React.Component{
   constructor(){
       super()
       this.state={
           topText:"",
           bottomText:"",
           randomimg:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXdtQ7vH2vak7mlWwZMApPOGAF8mgQXq7m5w&usqp=CAU",
           allMemeImgs:[]
       }
   }
   componentDidMount(){
       fetch('https://api.imgflip.com/get_memes')
       .then(response=>response.json())
       .then(response=>{
           const {memes}=response.data
           console.log(memes[0])
           this.setState({
               allMemeImgs : memes
           })
       })
   }
   handleChange(event){
       const {name,value}=event.target;
       this.setState({
           [name]:value
       })
   }
   render(){
       return(
           <div>
               <header className="navbar">
                   <img 
                     src="data:image/png;base64,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" 
                     height="100px"
                     weight="100px"
                     alt="problem"></img>
                     <p>Meme Generator</p>
                </header>
                <form>
                    <input
                      type="text"
                      name="topText"
                      placeholder="Top Text"
                      value={this.state.topText}
                      onChange={this.handleChange}
                    />
                    <input
                      type="text"
                      name="bottomText"
                      placeholder="bottom Text"
                      value={this.state.bottomText}
                      onChange={this.handleChange}
                    />
                    <button className="gen-button">Gen</button>
                </form>
                <div>
                    <img src={this.state.randomimg} alt=""></img>
                    <h2>{this.state.topText}</h2>
                    <h2>{this.state.bottomText}</h2>
                </div>
           </div>
       )
   }
}
export default MemeGenerator;
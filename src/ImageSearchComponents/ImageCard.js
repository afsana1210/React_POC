import React from "react";

export default class ImageCard extends React.Component{
     constructor(props){
         super(props)
         this.state={spans:0}
         this.imageRef=React.createRef();
     }
     componentDidMount(){
       console.log(this.imageRef);
     }
}
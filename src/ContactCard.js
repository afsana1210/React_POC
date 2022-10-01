import React from "react";

function ContactCard(props){
    return(
      <div className="contact-list">
        <img src={props.imgUrl}/>
        <h3>{props.name}</h3>
        <p>Phone:{props.phone}</p>
      </div>
    )
    
}
export default ContactCard;
import React from "react";
import ContactCard from "./ContactCard";

function Contact(){
    return(
        <div>
            <ContactCard className='contact-item'
             imgUrl="https://images.unsplash.com/photo-1615789591457-74a63395c990?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=100&q=40" 
             name="cat" 
             phone="3467835837" />

        </div>
    )
}
export default Contact;
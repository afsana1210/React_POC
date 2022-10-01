import React from "react";

// function Header(){
//     return(
//         <header className='navbar'>Header element</header>
//     )
// }
class Header extends React.Component{
    render(){

        return(
            <header className='navbar'> Hello {this.props.username}</header>
        )

    }
        
}
export default Header;
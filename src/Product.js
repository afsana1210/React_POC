import React from "react";

function Product(props){
    return(
        <div>
            <h2>{props.products.name}</h2>
            <h2>{props.products.price.toLocaleString("en-US",{style:"currency" , currency:"USD"})}
            -{props.products.description}</h2>
        </div>
    )
}
export default Product;